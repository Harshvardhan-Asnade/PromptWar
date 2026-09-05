import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend directory or root directory
env_path = Path(__file__).resolve().parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()


class Settings:
    """Application configuration loaded from environment variables."""

    def __init__(self):
        self.reload()

    def reload(self):
        """Reload configuration from current environment variables."""
        self.AI_PROVIDER: str = os.getenv("AI_PROVIDER", "gemini").lower().strip()
        self.AI_API_KEY: str = (
            os.getenv("AI_API_KEY") or os.getenv("GEMINI_API_KEY") or ""
        ).strip()
        self.AI_BASE_URL: str = os.getenv(
            "AI_BASE_URL", "https://generativelanguage.googleapis.com/v1beta/openai"
        ).rstrip("/")
        self.AI_MODEL: str = os.getenv("AI_MODEL", "gemini-2.5-flash").strip()
        self.AI_TIMEOUT_SECONDS: float = float(os.getenv("AI_TIMEOUT_SECONDS", "45.0"))

    @property
    def is_mock_mode(self) -> bool:
        """
        Determines whether the application should operate in development mock mode.
        Mock mode is active if AI_PROVIDER is explicitly set to 'mock'.
        """
        return self.AI_PROVIDER == "mock"


settings = Settings()
