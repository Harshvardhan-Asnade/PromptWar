import os
import sys

# Ensure backend root is always on sys.path regardless of execution cwd
BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

import pytest
from config import settings
from main import reset_rate_limiter
from schemas.project import ProjectIdea


@pytest.fixture(autouse=True)
def clean_environment_for_tests(monkeypatch):
    """
    Guarantees each test runs with isolated, predictable environment settings.
    Defaults AI_PROVIDER to 'mock' so unit tests don't make real network calls,
    while allowing integration tests to explicitly override with monkeypatch.
    Resets the rate limiter cache for test independence.
    """
    orig_provider = os.getenv("AI_PROVIDER", "mock")
    orig_key = os.getenv("AI_API_KEY", "")
    orig_url = os.getenv("AI_BASE_URL", "")
    reset_rate_limiter()

    yield

    reset_rate_limiter()
    os.environ["AI_PROVIDER"] = orig_provider
    os.environ["AI_API_KEY"] = orig_key
    if orig_url:
        os.environ["AI_BASE_URL"] = orig_url
    settings.reload()


@pytest.fixture
def student_context_data():
    return {
        "interests": ["AI/ML", "Healthcare"],
        "skills": ["Python", "React", "Machine Learning"],
        "experience": "intermediate",
        "team_size": 3,
        "duration": "8 weeks",
        "difficulty": "balanced",
        "domain": "Healthcare",
    }


@pytest.fixture
def student_context(student_context_data):
    return student_context_data


@pytest.fixture
def sample_project_data():
    return {
        "id": "test-proj-1",
        "title": "Autonomous Healthcare Triage Network",
        "tagline": "Real-time edge triage and risk prioritization.",
        "problem": "Emergency departments face intake delays during peak periods.",
        "solution": "A localized edge computing pipeline classifying acuity scores in sub-50ms.",
        "why_it_fits": "Directly matches Python, ML, and React background within 8 weeks.",
        "innovation_score": 90,
        "feasibility_score": 85,
        "impact_score": 92,
        "technical_depth_score": 88,
        "difficulty": "Balanced",
        "features": [
            "Real-time vitals ingestion queue",
            "Acuity risk score inference engine",
            "Clinical triage dashboard",
        ],
        "advanced_features": [
            "Quantized model inference on edge",
            "FHIR standard data export",
        ],
        "tech_stack": ["Python 3.13", "FastAPI", "PyTorch", "React", "PostgreSQL"],
        "architecture": [
            "Telemetry Ingestion Gateway",
            "Inference Node",
            "Clinical Alert Dispatcher",
        ],
        "roadmap": [
            "Weeks 1-2: Architecture and synthetic clinical dataset",
            "Weeks 3-5: Model training and inference API",
            "Weeks 6-7: Dashboard integration and testing",
            "Week 8: Defense prep and demonstration",
        ],
        "datasets": ["MIMIC-IV Synthetic Clinical Benchmark"],
        "risks": ["Model calibration drift under rare symptoms"],
        "improvements": ["Implement conformal prediction intervals"],
    }


@pytest.fixture
def sample_project(sample_project_data):
    return ProjectIdea.model_validate(sample_project_data)
