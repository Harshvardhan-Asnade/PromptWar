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
        self.AI_PROVIDER: str = os.getenv("AI_PROVIDER", "groq").lower().strip()
        self.AI_API_KEY: str = (
            os.getenv("AI_API_KEY")
            or os.getenv("GROQ_API_KEY")
            or os.getenv("GEMINI_API_KEY")
            or ""
        ).strip()
        default_base_url = (
            "https://api.groq.com/openai/v1"
            if self.AI_PROVIDER == "groq"
            else "https://generativelanguage.googleapis.com/v1beta/openai"
        )
        self.AI_BASE_URL: str = os.getenv("AI_BASE_URL", default_base_url).rstrip("/")
        default_model = (
            "openai/gpt-oss-20b"
            if self.AI_PROVIDER == "groq"
            else "gemini-2.5-flash"
        )
        self.AI_MODEL: str = os.getenv("AI_MODEL", default_model).strip()
        self.AI_TIMEOUT_SECONDS: float = float(os.getenv("AI_TIMEOUT_SECONDS", "60.0"))
        
        # CORS configuration
        origins_env = os.getenv("ALLOWED_ORIGINS", "")
        if origins_env:
            self.ALLOWED_ORIGINS: list[str] = [
                origin.strip() for origin in origins_env.split(",") if origin.strip()
            ]
        else:
            self.ALLOWED_ORIGINS: list[str] = [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "https://projectforge-iota.vercel.app",
            ]

    @property
    def is_mock_mode(self) -> bool:
        """
        Determines whether the application should operate in development mock mode.
        Mock mode is active if AI_PROVIDER is explicitly set to 'mock'.
        """
        return self.AI_PROVIDER == "mock"


settings = Settings()
