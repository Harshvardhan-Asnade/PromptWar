from .health import router as health_router
from .projects import router as projects_router
from .mentor import router as mentor_router

__all__ = ["health_router", "projects_router", "mentor_router"]
