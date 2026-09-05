from fastapi.testclient import TestClient
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app

client = TestClient(app)

def test_security_headers_present():
    """Verify security headers are applied to API responses."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.headers.get("x-content-type-options") == "nosniff"
    assert response.headers.get("x-frame-options") == "DENY"
    assert response.headers.get("referrer-policy") == "strict-origin-when-cross-origin"
    assert "geolocation=()" in response.headers.get("permissions-policy", "")
    print("✓ Security headers verified on /api/health")

def test_request_body_size_limit_413():
    """Verify requests with payloads > 512 KB receive HTTP 413 Payload Too Large."""
    # Construct a large payload > 512 KB
    large_string = "A" * (520 * 1024)
    response = client.post(
        "/api/mentor",
        data=large_string,
        headers={"Content-Type": "application/json"}
    )
    assert response.status_code == 413
    json_data = response.json()
    detail = json_data.get("detail", {})
    msg = detail.get("message", "") if isinstance(detail, dict) else str(detail)
    assert "Payload too large" in msg or "512 KB" in msg
    print("✓ Request body size limit (HTTP 413) verified")

def test_mentor_question_validation():
    """Verify strict validation on /api/mentor input bounds."""
    # Question too short (< 3 chars)
    payload_short = {
        "project": {
            "title": "Autonomous Drone Fleet",
            "tagline": "Distributed edge navigation.",
            "problem": "Manual inspection is dangerous.",
            "solution": "Edge AI drones.",
            "why_it_fits": "Fits student profile.",
            "innovation_score": 9,
            "feasibility_score": 8,
            "impact_score": 9,
            "technical_depth_score": 9,
            "difficulty": "advanced",
            "features": ["SLAM", "Obstacle avoidance"],
            "tech_stack": ["ROS 2", "Python", "C++"],
            "architecture": "Edge drone network.",
            "roadmap": ["Month 1: Prototype", "Month 2: Test"],
            "risks": ["Sensor noise"],
            "improvements": ["Dual IMU"]
        },
        "student_context": {
            "interests": ["Robotics"],
            "skills": ["C++", "Python"],
            "experience": "advanced",
            "team_size": 3,
            "duration": "8 weeks",
            "difficulty": "advanced",
            "domain": "Robotics"
        },
        "question": "No" # Only 2 chars
    }
    resp = client.post("/api/mentor", json=payload_short)
    assert resp.status_code == 422
    print("✓ Mentor question min_length validation verified (HTTP 422)")

    # Question too long (> 1000 chars)
    payload_long = dict(payload_short)
    payload_long["question"] = "X" * 1001
    resp_long = client.post("/api/mentor", json=payload_long)
    assert resp_long.status_code == 422
    print("✓ Mentor question max_length validation verified (HTTP 422)")

def test_team_size_bounds_validation():
    """Verify team_size bounds (1 to 20)."""
    payload_zero_team = {
        "interests": ["AI/ML"],
        "skills": ["Python"],
        "experience": "intermediate",
        "team_size": 0, # Invalid: must be >= 1
        "duration": "8 weeks",
        "difficulty": "intermediate",
        "domain": "AI/ML"
    }
    resp = client.post("/api/projects/generate", json=payload_zero_team)
    assert resp.status_code == 422
    print("✓ Team size bounds validation (team_size >= 1) verified (HTTP 422)")

    payload_huge_team = dict(payload_zero_team)
    payload_huge_team["team_size"] = 50 # Invalid: must be <= 20
    resp_huge = client.post("/api/projects/generate", json=payload_huge_team)
    assert resp_huge.status_code == 422
    print("✓ Team size bounds validation (team_size <= 20) verified (HTTP 422)")

def test_rate_limiting_429():
    """Verify that rapid requests to AI endpoints trigger HTTP 429."""
    # The limit is 40 requests/min. Let's send requests until 429 is received or 45 requests sent.
    # Using an invalid team_size ensures the request does not call Groq,
    # while the middleware counts each hit against the rate limit window.
    payload = {
        "interests": ["AI/ML"],
        "skills": ["Python"],
        "experience": "intermediate",
        "team_size": -1,
        "duration": "8 weeks",
        "difficulty": "intermediate",
        "domain": "AI/ML"
    }
    
    got_429 = False
    for i in range(45):
        # Using a bogus team_size to trigger 422 fast or 429
        # The rate limiter counts every request to /api/projects/* before the handler executes
        resp = client.post("/api/projects/generate", json=payload)
        if resp.status_code == 429:
            got_429 = True
            detail = resp.json().get("detail", {})
            msg = detail.get("message", "") if isinstance(detail, dict) else str(detail)
            assert "Too many requests" in msg
            break
            
    assert got_429, "Rate limiter should have triggered HTTP 429 after threshold"
    print("✓ Rate limiter (HTTP 429) verified")

if __name__ == "__main__":
    test_security_headers_present()
    test_request_body_size_limit_413()
    test_mentor_question_validation()
    test_team_size_bounds_validation()
    test_rate_limiting_429()
    print("\n✅ ALL SECURITY & RATE LIMIT TESTS PASSED!")
