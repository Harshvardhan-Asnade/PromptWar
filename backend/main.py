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

import time
from collections import defaultdict
from fastapi import Request, Response
from fastapi.responses import JSONResponse

from config import settings

# --- SECURITY & HARDENING MIDDLEWARE ---

# In-memory sliding rate limiter: tracks timestamps per client IP
RATE_LIMIT_WINDOW_SECONDS = 60
MAX_REQUESTS_PER_WINDOW = 40
_request_timestamps: dict[str, list[float]] = defaultdict(list)
MAX_REQUEST_BODY_BYTES = 524_288  # 512 KB


@app.middleware("http")
async def security_and_rate_limit_middleware(request: Request, call_next):
    # 1. Request Body Size Guard
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > MAX_REQUEST_BODY_BYTES:
        return JSONResponse(
            status_code=413,
            content={"detail": {"message": "Payload too large. Request body cannot exceed 512 KB."}},
        )

    # 2. Rate Limiting for AI endpoints
    path = request.url.path
    if path.startswith("/api/projects") or path.startswith("/api/mentor"):
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        timestamps = _request_timestamps[client_ip]

        # Prune older timestamps outside the current window
        cutoff = now - RATE_LIMIT_WINDOW_SECONDS
        _request_timestamps[client_ip] = [t for t in timestamps if t > cutoff]

        if len(_request_timestamps[client_ip]) >= MAX_REQUESTS_PER_WINDOW:
            return JSONResponse(
                status_code=429,
                content={
                    "detail": {
                        "message": "Too many requests. Please wait a moment before trying again."
                    }
                },
                headers={"Retry-After": "60"},
            )

        _request_timestamps[client_ip].append(now)

    # 3. Process Request
    response: Response = await call_next(request)

    # 4. Inject Production Security Headers (OWASP Recommended)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    response.headers["X-XSS-Protection"] = "1; mode=block"

    return response


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
