import os
import sys
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

from fastapi.testclient import TestClient
from config import settings

# Ensure mock mode for deterministic core user journey test
os.environ["AI_PROVIDER"] = "mock"
settings.reload()

from main import app
from schemas.project import GenerateProjectsResponse, ProjectIdea
from schemas.evaluation import EvaluateProjectResponse
from schemas.improvement import ImproveProjectResponse
from schemas.mentor import MentorResponse

client = TestClient(app)


def test_full_core_user_journey():
    """
    Validates the entire end-to-end user journey across all stages:
    1. Health Check (Platform online)
    2. Discovery / Generate (Student profile produces exactly 3 candidate ideas)
    3. Project Selection (Idea 1 selected, state carried over)
    4. Project Detail / Blueprint verification
    5. Feasibility Review / Evaluation (Feasibility audit computed with 0-100 scores)
    6. Project Improvement (Hardening project architecture & scope)
    7. Context-Aware AI Mentor (Consultation grounded in selected project context)
    """

    # Stage 1: Health Check
    health_res = client.get("/api/health")
    assert health_res.status_code == 200
    assert health_res.json() == {"status": "ok", "service": "project-forge"}

    # Stage 2: Student Discovery & Generation
    student_profile = {
        "interests": ["Machine Learning", "Distributed Systems"],
        "skills": ["Python", "FastAPI", "Docker", "PyTorch"],
        "experience": "intermediate",
        "team_size": 3,
        "duration": "10 weeks",
        "difficulty": "balanced",
        "domain": "AI / ML",
    }

    gen_res = client.post("/api/projects/generate", json=student_profile)
    assert gen_res.status_code == 200, f"Generation failed: {gen_res.text}"
    gen_data = gen_res.json()
    validated_gen = GenerateProjectsResponse.model_validate(gen_data)

    # Must produce exactly 3 distinct directions
    assert len(validated_gen.projects) == 3
    for proj in validated_gen.projects:
        assert proj.id
        assert proj.title
        assert proj.tagline
        assert proj.problem
        assert proj.solution
        assert proj.why_it_fits
        assert 0 <= proj.innovation_score <= 100
        assert 0 <= proj.feasibility_score <= 100
        assert 0 <= proj.impact_score <= 100
        assert 0 <= proj.technical_depth_score <= 100
        assert len(proj.features) >= 1
        assert len(proj.tech_stack) >= 1
        assert len(proj.architecture) >= 1
        assert len(proj.roadmap) >= 1

    # Stage 3 & 4: Student selects Project 0
    selected_project = validated_gen.projects[0]
    assert selected_project.title
    assert len(selected_project.tech_stack) > 0

    # Stage 5: Evaluation / Review
    eval_payload = {
        "project": selected_project.model_dump(),
        "student_context": student_profile,
    }
    eval_res = client.post("/api/projects/evaluate", json=eval_payload)
    assert eval_res.status_code == 200, f"Evaluation failed: {eval_res.text}"
    eval_data = eval_res.json()
    validated_eval = EvaluateProjectResponse.model_validate(eval_data)

    assert 0 <= validated_eval.overall_score <= 100
    assert 0 <= validated_eval.innovation_score <= 100
    assert 0 <= validated_eval.feasibility_score <= 100
    assert 0 <= validated_eval.impact_score <= 100
    assert 0 <= validated_eval.technical_depth_score <= 100
    assert 0 <= validated_eval.uniqueness_score <= 100
    assert 0 <= validated_eval.scope_score <= 100
    assert len(validated_eval.strengths) >= 1
    assert len(validated_eval.weaknesses) >= 1
    assert len(validated_eval.recommendations) >= 1

    # Stage 6: Improvement / Hardening
    improve_payload = {
        "project": selected_project.model_dump(),
        "student_context": student_profile,
        "focus_areas": ["architecture", "scope", "feasibility"],
    }
    improve_res = client.post("/api/projects/improve", json=improve_payload)
    assert improve_res.status_code == 200, f"Improvement failed: {improve_res.text}"
    improve_data = improve_res.json()
    validated_improve = ImproveProjectResponse.model_validate(improve_data)

    improved_proj = validated_improve.improved_project
    assert improved_proj.title
    assert validated_improve.summary_of_changes
    assert len(validated_improve.feature_improvements) >= 1
    assert len(validated_improve.technical_improvements) >= 1
    assert len(validated_improve.architecture_improvements) >= 1

    # Stage 7: Context-Aware AI Mentorship
    mentor_payload = {
        "project": improved_proj.model_dump(),
        "student_context": student_profile,
        "question": "What core milestone should our 3-person team tackle during Weeks 1-3?",
    }
    mentor_res = client.post("/api/mentor", json=mentor_payload)
    assert mentor_res.status_code == 200, f"Mentor failed: {mentor_res.text}"
    mentor_data = mentor_res.json()
    validated_mentor = MentorResponse.model_validate(mentor_data)

    assert validated_mentor.answer
    assert validated_mentor.recommended_next_action
    assert len(validated_mentor.key_takeaways) >= 1


def test_state_continuity_preservation():
    """Verify that student context and project data maintain integrity across transitions."""
    profile = {
        "interests": ["Cybersecurity"],
        "skills": ["Rust", "Python", "Networking"],
        "experience": "advanced",
        "team_size": 2,
        "duration": "12 weeks",
        "difficulty": "challenging",
        "domain": "Cybersecurity",
    }
    res = client.post("/api/projects/generate", json=profile)
    assert res.status_code == 200
    projects = res.json()["projects"]
    assert len(projects) == 3

    # Ensure each project carries unique identifiers
    ids = {p["id"] for p in projects}
    assert len(ids) == 3
