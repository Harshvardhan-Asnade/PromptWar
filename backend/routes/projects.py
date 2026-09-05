from fastapi import APIRouter, HTTPException, status
from schemas.project import (
    GenerateProjectsRequest,
    GenerateProjectsResponse,
)
from schemas.evaluation import (
    EvaluateProjectRequest,
    EvaluateProjectResponse,
)
from schemas.improvement import (
    ImproveProjectRequest,
    ImproveProjectResponse,
)
from services.ai_service import (
    AIServiceError,
    generate_projects,
    evaluate_project,
    improve_project,
)

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.post(
    "/generate",
    response_model=GenerateProjectsResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate 3 curated final-year project ideas",
)
async def generate_projects_endpoint(
    request: GenerateProjectsRequest,
) -> GenerateProjectsResponse:
    """
    Accepts student technical skills, interests, and constraints to generate
    three personalized, rigorous, and feasible capstone project blueprints.
    """
    try:
        return await generate_projects(request)
    except AIServiceError as exc:
        raise HTTPException(
            status_code=exc.status_code,
            detail={"message": exc.message, "detail": exc.detail},
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"message": "An unexpected error occurred while generating project ideas."},
        )


@router.post(
    "/evaluate",
    response_model=EvaluateProjectResponse,
    status_code=status.HTTP_200_OK,
    summary="Evaluate a selected project blueprint",
)
async def evaluate_project_endpoint(
    request: EvaluateProjectRequest,
) -> EvaluateProjectResponse:
    """
    Critically evaluates a selected project plan for technical depth, feasibility,
    and novelty against the student team's timeline and constraints.
    """
    try:
        return await evaluate_project(request)
    except AIServiceError as exc:
        raise HTTPException(
            status_code=exc.status_code,
            detail={"message": exc.message, "detail": exc.detail},
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"message": "An unexpected error occurred while evaluating the project."},
        )


@router.post(
    "/improve",
    response_model=ImproveProjectResponse,
    status_code=status.HTTP_200_OK,
    summary="Upgrade and harden project specifications",
)
async def improve_project_endpoint(
    request: ImproveProjectRequest,
) -> ImproveProjectResponse:
    """
    Proposes concrete architectural, technical, and scope improvements to enhance
    the selected project's academic rigor and deliverability.
    """
    try:
        return await improve_project(request)
    except AIServiceError as exc:
        raise HTTPException(
            status_code=exc.status_code,
            detail={"message": exc.message, "detail": exc.detail},
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"message": "An unexpected error occurred while generating improvements."},
        )
