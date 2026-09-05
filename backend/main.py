from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import (
    health_router,
    projects_router,
    mentor_router,
)

app = FastAPI(
    title="Project Forge API",
    description="AI-powered ideation, blueprinting, and mentorship engine for final-year engineering projects.",
    version="0.2.0",
)

from config import settings

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(health_router)
app.include_router(projects_router)
app.include_router(mentor_router)


@app.get("/")
async def root():
    return {
        "name": "Project Forge API",
        "version": "0.2.0",
        "docs": "/docs",
        "health": "/api/health",
        "endpoints": {
            "generate": "/api/projects/generate",
            "evaluate": "/api/projects/evaluate",
            "improve": "/api/projects/improve",
            "mentor": "/api/mentor",
        },
    }


if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
