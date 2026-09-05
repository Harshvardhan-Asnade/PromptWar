import os
import sys
import json
from pathlib import Path
from unittest.mock import patch
import httpx
import pytest

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

from fastapi.testclient import TestClient
from config import settings
from main import app

client = TestClient(app)


def test_ai_timeout_returns_504(monkeypatch):
    """Verify that an upstream AI provider timeout cleanly maps to HTTP 504 with safe message."""
    monkeypatch.setenv("AI_PROVIDER", "groq")
    monkeypatch.setenv("AI_API_KEY", "gsk_test_key_for_timeout")
    settings.reload()

    async def mock_post(*args, **kwargs):
        raise httpx.TimeoutException("Upstream timeout reached")

    with patch("httpx.AsyncClient.post", side_effect=mock_post):
        payload = {
            "interests": ["AI/ML"],
            "skills": ["Python"],
            "experience": "intermediate",
            "team_size": 3,
            "duration": "8 weeks",
            "difficulty": "balanced",
        }
        res = client.post("/api/projects/generate", json=payload)
        assert res.status_code == 504
        assert "timed out" in res.text.lower()
        # Verify no stack trace or internal details leak
        assert "traceback" not in res.text.lower()
        assert "gsk_" not in res.text


def test_ai_upstream_rate_limit_returns_429(monkeypatch):
    """Verify that an upstream AI provider 429 returns HTTP 429 to client with safe message."""
    monkeypatch.setenv("AI_PROVIDER", "groq")
    monkeypatch.setenv("AI_API_KEY", "gsk_test_key_for_rate_limit")
    settings.reload()

    async def mock_post(url, **kwargs):
        return httpx.Response(429, json={"error": "Rate limit exceeded"}, request=httpx.Request("POST", str(url)))

    with patch("httpx.AsyncClient.post", side_effect=mock_post):
        payload = {
            "interests": ["AI/ML"],
            "skills": ["Python"],
            "experience": "intermediate",
            "team_size": 3,
            "duration": "8 weeks",
            "difficulty": "balanced",
        }
        res = client.post("/api/projects/generate", json=payload)
        assert res.status_code == 429
        assert "rate limit" in res.text.lower()


def test_ai_upstream_server_error_returns_502(monkeypatch):
    """Verify that an upstream AI 500 error returns HTTP 502 with safe user message."""
    monkeypatch.setenv("AI_PROVIDER", "groq")
    monkeypatch.setenv("AI_API_KEY", "gsk_test_key_for_server_error")
    settings.reload()

    async def mock_post(url, **kwargs):
        return httpx.Response(503, text="Service Unavailable", request=httpx.Request("POST", str(url)))

    with patch("httpx.AsyncClient.post", side_effect=mock_post):
        payload = {
            "interests": ["AI/ML"],
            "skills": ["Python"],
            "experience": "intermediate",
            "team_size": 3,
            "duration": "8 weeks",
            "difficulty": "balanced",
        }
        res = client.post("/api/projects/generate", json=payload)
        assert res.status_code == 502
        assert "temporarily unavailable" in res.text.lower()


def test_malformed_ai_json_returns_502(monkeypatch):
    """Verify that garbage/non-JSON model output triggers safe 502 without unhandled crash."""
    monkeypatch.setenv("AI_PROVIDER", "groq")
    monkeypatch.setenv("AI_API_KEY", "gsk_test_key_for_malformed")
    settings.reload()

    async def mock_post(url, **kwargs):
        bad_response = {
            "choices": [{"message": {"role": "assistant", "content": "I am unable to output JSON: <script>alert(1)</script>"}}]
        }
        return httpx.Response(200, json=bad_response, request=httpx.Request("POST", str(url)))

    with patch("httpx.AsyncClient.post", side_effect=mock_post):
        payload = {
            "interests": ["AI/ML"],
            "skills": ["Python"],
            "experience": "intermediate",
            "team_size": 3,
            "duration": "8 weeks",
            "difficulty": "balanced",
        }
        res = client.post("/api/projects/generate", json=payload)
        assert res.status_code == 502
        assert "valid structured json" in res.text.lower() or "failed schema verification" in res.text.lower()


def test_empty_ai_response_returns_502(monkeypatch):
    """Verify that an empty response body from the AI provider returns 502."""
    monkeypatch.setenv("AI_PROVIDER", "groq")
    monkeypatch.setenv("AI_API_KEY", "gsk_test_key_for_empty")
    settings.reload()

    async def mock_post(url, **kwargs):
        empty_response = {"choices": [{"message": {"role": "assistant", "content": ""}}]}
        return httpx.Response(200, json=empty_response, request=httpx.Request("POST", str(url)))

    with patch("httpx.AsyncClient.post", side_effect=mock_post):
        payload = {
            "interests": ["AI/ML"],
            "skills": ["Python"],
            "experience": "intermediate",
            "team_size": 3,
            "duration": "8 weeks",
            "difficulty": "balanced",
        }
        res = client.post("/api/projects/generate", json=payload)
        assert res.status_code == 502
        assert "empty response" in res.text.lower()


def test_invalid_student_input_boundary_validation():
    """Verify endpoint rejects out-of-boundary inputs with 422 Unprocessable Entity."""
    # 1. Invalid difficulty string (blank)
    res1 = client.post(
        "/api/projects/generate",
        json={
            "interests": ["AI/ML"],
            "skills": ["Python"],
            "experience": "intermediate",
            "team_size": 3,
            "duration": "8 weeks",
            "difficulty": "   ",
        },
    )
    assert res1.status_code == 422

    # 2. Team size > 20
    res2 = client.post(
        "/api/projects/generate",
        json={
            "interests": ["AI/ML"],
            "skills": ["Python"],
            "experience": "intermediate",
            "team_size": 25,
            "duration": "8 weeks",
            "difficulty": "balanced",
        },
    )
    assert res2.status_code == 422

    # 3. Missing skills
    res3 = client.post(
        "/api/projects/generate",
        json={
            "interests": ["AI/ML"],
            "skills": [],
            "experience": "intermediate",
            "team_size": 3,
            "duration": "8 weeks",
            "difficulty": "balanced",
        },
    )
    assert res3.status_code == 422
