from fastapi import APIRouter, HTTPException, status
from schemas.mentor import (
    MentorRequest,
    MentorResponse,
)
from services.ai_service import (
    AIServiceError,
    ask_mentor,
)

router = APIRouter(prefix="/api", tags=["mentor"])


@router.post(
    "/mentor",
    response_model=MentorResponse,
    status_code=status.HTTP_200_OK,
    summary="Consult the AI technical project mentor",
)
async def mentor_endpoint(
    request: MentorRequest,
) -> MentorResponse:
    """
    Provides context-aware technical mentorship and pragmatic decision guidance
    grounded in the student's active project specification and constraints.
    """
    try:
        return await ask_mentor(request)
    except AIServiceError as exc:
        raise HTTPException(
            status_code=exc.status_code,
            detail={"message": exc.message, "detail": exc.detail},
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"message": "An unexpected error occurred while consulting the mentor."},
        )
