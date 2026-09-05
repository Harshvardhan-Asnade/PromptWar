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

# Configure CORS for local frontend development
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
