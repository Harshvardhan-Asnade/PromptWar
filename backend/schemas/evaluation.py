from typing import List
from pydantic import BaseModel, Field, field_validator
from .project import GenerateProjectsRequest, ProjectIdea


class EvaluateProjectRequest(BaseModel):
    project: ProjectIdea = Field(..., description="The selected project idea to evaluate.")
    student_context: GenerateProjectsRequest = Field(
        ..., description="The student's background, team constraints, and capabilities."
    )


class EvaluateProjectResponse(BaseModel):
    innovation_score: int = Field(..., ge=0, le=100, description="Evaluated novelty score (0-100).")
    feasibility_score: int = Field(..., ge=0, le=100, description="Evaluated completion feasibility (0-100).")
    impact_score: int = Field(..., ge=0, le=100, description="Real-world utility index (0-100).")
    technical_depth_score: int = Field(..., ge=0, le=100, description="Engineering complexity and depth (0-100).")
    uniqueness_score: int = Field(..., ge=0, le=100, description="Distinction from common boilerplate projects (0-100).")
    scope_score: int = Field(..., ge=0, le=100, description="Appropriateness of scope for the allocated timeline (0-100).")
    overall_score: int = Field(..., ge=0, le=100, description="Weighted composite score (0-100).")
    strengths: List[str] = Field(..., description="Key technical and practical strengths.")
    weaknesses: List[str] = Field(..., description="Critical architectural or execution deficiencies.")
    risks: List[str] = Field(..., description="Primary risk factors that could derail delivery.")
    recommendations: List[str] = Field(..., description="Strategic recommendations for project defense & execution.")

    @field_validator("strengths", "weaknesses", "risks", "recommendations", mode="before")
    @classmethod
    def coerce_list_of_strings(cls, val):
        if isinstance(val, str):
            lines = [line.lstrip("-*• ").strip() for line in val.split("\n") if line.strip()]
            return lines if lines else [val.strip()]
        return val
