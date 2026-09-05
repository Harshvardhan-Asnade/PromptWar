from typing import List, Optional
from pydantic import BaseModel, Field
from .project import GenerateProjectsRequest, ProjectIdea


class ImproveProjectRequest(BaseModel):
    project: ProjectIdea = Field(..., description="The original project idea to improve.")
    student_context: GenerateProjectsRequest = Field(
        ..., description="Student constraints and capabilities to respect during refinement."
    )
    focus_areas: Optional[List[str]] = Field(
        default=None,
        description="Optional priority domains for improvement (e.g. ['architecture', 'scalability', 'innovation']).",
    )


class ImproveProjectResponse(BaseModel):
    improved_project: ProjectIdea = Field(
        ..., description="The upgraded project specification incorporating all refinements."
    )
    summary_of_changes: str = Field(
        ..., description="Executive summary of major architectural and strategic enhancements."
    )
    feature_improvements: List[str] = Field(..., description="Refined and newly introduced features.")
    technical_improvements: List[str] = Field(..., description="Deeper engineering algorithms, frameworks, or tools.")
    architecture_improvements: List[str] = Field(..., description="Structural improvements to components and data flows.")
    innovation_opportunities: List[str] = Field(..., description="Novel avenues to distinguish the project academically.")
    scope_adjustments: List[str] = Field(..., description="Pruned low-value features or timeline safeguards.")
    scalability_improvements: List[str] = Field(..., description="Readiness for distributed loads or real-world deployment.")
