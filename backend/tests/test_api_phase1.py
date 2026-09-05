import sys
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

import os
from fastapi.testclient import TestClient
from config import settings

# Explicitly ensure mock mode for Phase 1 baseline regression suite
os.environ["AI_PROVIDER"] = "mock"
settings.reload()

from main import app
from schemas.project import GenerateProjectsResponse
from schemas.evaluation import EvaluateProjectResponse
from schemas.improvement import ImproveProjectResponse
from schemas.mentor import MentorResponse

client = TestClient(app)


def test_health_endpoint():
    """Verify GET /api/health returns exact expected response."""
    response = client.get("/api/health")
    assert response.status_code == 200, f"Health check failed: {response.text}"
    data = response.json()
    assert data == {"status": "ok", "service": "project-forge"}
    print("✓ GET /api/health passed")


def test_generate_projects_valid():
    """Verify POST /api/projects/generate produces exactly 3 structured project ideas."""
    payload = {
        "interests": ["AI/ML", "Healthcare"],
        "skills": ["Python", "React", "Machine Learning"],
        "experience": "intermediate",
        "team_size": 3,
        "duration": "8 weeks",
        "difficulty": "balanced",
        "domain": "Healthcare",
    }
    response = client.post("/api/projects/generate", json=payload)
    assert response.status_code == 200, f"Generate failed: {response.text}"
    data = response.json()

    # Validate against Pydantic schema
    validated = GenerateProjectsResponse.model_validate(data)
    assert len(validated.projects) == 3, f"Expected 3 projects, got {len(validated.projects)}"

    for i, proj in enumerate(validated.projects):
        assert proj.id, f"Project {i} missing id"
        assert proj.title, f"Project {i} missing title"
        assert proj.tagline, f"Project {i} missing tagline"
        assert proj.problem, f"Project {i} missing problem"
        assert proj.solution, f"Project {i} missing solution"
        assert proj.why_it_fits, f"Project {i} missing why_it_fits"
        assert 0 <= proj.innovation_score <= 100
        assert 0 <= proj.feasibility_score <= 100
        assert 0 <= proj.impact_score <= 100
        assert 0 <= proj.technical_depth_score <= 100
        assert len(proj.features) >= 1
        assert len(proj.tech_stack) >= 1
        assert len(proj.architecture) >= 1
        assert len(proj.roadmap) >= 1

    print(f"✓ POST /api/projects/generate passed (3 projects generated: {[p.title for p in validated.projects]})")
    return validated.projects[0], payload


def test_generate_projects_invalid_input():
    """Verify POST /api/projects/generate rejects invalid inputs with 422."""
    # Empty skills
    bad_payload_1 = {
        "interests": ["AI/ML"],
        "skills": [],
        "experience": "intermediate",
        "team_size": 3,
        "duration": "8 weeks",
        "difficulty": "balanced",
    }
    res1 = client.post("/api/projects/generate", json=bad_payload_1)
    assert res1.status_code == 422, f"Expected 422, got {res1.status_code}"

    # Invalid team size (<= 0)
    bad_payload_2 = {
        "interests": ["AI/ML"],
        "skills": ["Python"],
        "experience": "intermediate",
        "team_size": 0,
        "duration": "8 weeks",
        "difficulty": "balanced",
    }
    res2 = client.post("/api/projects/generate", json=bad_payload_2)
    assert res2.status_code == 422, f"Expected 422, got {res2.status_code}"
    print("✓ POST /api/projects/generate input validation (422) passed")


def test_evaluate_project(sample_project, student_context):
    """Verify POST /api/projects/evaluate scores and analyzes the selected project."""
    payload = {
        "project": sample_project.model_dump(),
        "student_context": student_context,
    }
    response = client.post("/api/projects/evaluate", json=payload)
    assert response.status_code == 200, f"Evaluate failed: {response.text}"
    data = response.json()

    validated = EvaluateProjectResponse.model_validate(data)
    assert 0 <= validated.innovation_score <= 100
    assert 0 <= validated.feasibility_score <= 100
    assert 0 <= validated.impact_score <= 100
    assert 0 <= validated.technical_depth_score <= 100
    assert 0 <= validated.uniqueness_score <= 100
    assert 0 <= validated.scope_score <= 100
    assert 0 <= validated.overall_score <= 100
    assert len(validated.strengths) >= 1
    assert len(validated.weaknesses) >= 1
    assert len(validated.recommendations) >= 1
    print(f"✓ POST /api/projects/evaluate passed (Overall Score: {validated.overall_score})")


def test_improve_project(sample_project, student_context):
    """Verify POST /api/projects/improve returns upgraded project and suggestions."""
    payload = {
        "project": sample_project.model_dump(),
        "student_context": student_context,
        "focus_areas": ["architecture", "scalability"],
    }
    response = client.post("/api/projects/improve", json=payload)
    assert response.status_code == 200, f"Improve failed: {response.text}"
    data = response.json()

    validated = ImproveProjectResponse.model_validate(data)
    assert validated.improved_project.title
    assert validated.summary_of_changes
    assert len(validated.feature_improvements) >= 1
    assert len(validated.technical_improvements) >= 1
    assert len(validated.architecture_improvements) >= 1
    print(f"✓ POST /api/projects/improve passed (Changes: {validated.summary_of_changes[:60]}...)")


def test_mentor_endpoint(sample_project, student_context):
    """Verify POST /api/mentor returns contextual guidance."""
    questions = [
        "How can I make this project more innovative?",
        "Can our team complete this in 8 weeks?",
        "Which feature should we build first?",
    ]

    for q in questions:
        payload = {
            "project": sample_project.model_dump(),
            "student_context": student_context,
            "question": q,
        }
        response = client.post("/api/mentor", json=payload)
        assert response.status_code == 200, f"Mentor failed: {response.text}"
        data = response.json()

        validated = MentorResponse.model_validate(data)
        assert validated.answer
        assert validated.recommended_next_action
        assert len(validated.key_takeaways) >= 1
        print(f"✓ POST /api/mentor question ('{q[:30]}...') passed")

    # Test empty question rejected
    bad_payload = {
        "project": sample_project.model_dump(),
        "student_context": student_context,
        "question": "   ",
    }
    bad_res = client.post("/api/mentor", json=bad_payload)
    assert bad_res.status_code == 422
    print("✓ POST /api/mentor empty question rejected (422) passed")


if __name__ == "__main__":
    print("=== Running Phase 1 Backend Test Suite ===")
    test_health_endpoint()
    sample_proj, ctx = test_generate_projects_valid()
    test_generate_projects_invalid_input()
    test_evaluate_project(sample_proj, ctx)
    test_improve_project(sample_proj, ctx)
    test_mentor_endpoint(sample_proj, ctx)
    print("=== ALL PHASE 1 TESTS PASSED SUCCESSFULLY! ===")
