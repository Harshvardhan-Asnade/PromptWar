from typing import List, Optional
from pydantic import BaseModel, Field, field_validator, model_validator


class GenerateProjectsRequest(BaseModel):
    interests: List[str] = Field(
        ...,
        min_length=1,
        description="List of student interest domains (e.g. AI/ML, Healthcare, FinTech).",
        examples=[["AI/ML", "Healthcare"]],
    )
    skills: List[str] = Field(
        ...,
        min_length=1,
        description="Technical skills possessed by the student/team (e.g. Python, React, PyTorch).",
        examples=[["Python", "React", "Machine Learning"]],
    )
    experience: str = Field(
        ...,
        min_length=1,
        description="Experience level: beginner, intermediate, advanced.",
        examples=["intermediate"],
    )
    team_size: int = Field(
        ...,
        ge=1,
        description="Number of team members executing the project.",
        examples=[3],
    )
    duration: str = Field(
        ...,
        min_length=1,
        description="Available timeline for development (e.g. 8 weeks, 3 months).",
        examples=["8 weeks"],
    )
    difficulty: str = Field(
        ...,
        min_length=1,
        description="Preferred challenge tier: safe, balanced, challenging, research-oriented.",
        examples=["balanced"],
    )
    domain: Optional[str] = Field(
        default=None,
        description="Optional preferred primary industry or academic domain.",
        examples=["Healthcare"],
    )

    @field_validator("interests", "skills")
    @classmethod
    def validate_non_empty_items(cls, values: List[str]) -> List[str]:
        cleaned = [item.strip() for item in values if item and item.strip()]
        if not cleaned:
            raise ValueError("List must contain at least one non-empty string.")
        return cleaned

    @field_validator("experience", "duration", "difficulty")
    @classmethod
    def validate_strings(cls, val: str) -> str:
        cleaned = val.strip()
        if not cleaned:
            raise ValueError("Field cannot be blank.")
        return cleaned


class ProjectIdea(BaseModel):
    id: str = Field(..., description="Unique project identifier (e.g. project-1).")
    title: str = Field(..., description="High-impact project title.")
    tagline: str = Field(..., description="Concise one-line pitch.")
    problem: str = Field(..., description="Detailed description of the real-world problem.")
    solution: str = Field(..., description="Concrete proposed system solution.")
    why_it_fits: str = Field(..., description="Explanation of why this matches the student's background.")
    innovation_score: int = Field(..., ge=0, le=100, description="Innovation index (0-100).")
    feasibility_score: int = Field(..., ge=0, le=100, description="Feasibility index (0-100).")
    impact_score: int = Field(..., ge=0, le=100, description="Real-world impact index (0-100).")
    technical_depth_score: int = Field(..., ge=0, le=100, description="Technical rigor index (0-100).")
    difficulty: str = Field(..., description="Difficulty rating (e.g. Intermediate, Advanced).")
    features: List[str] = Field(..., description="Core MVP features required for completion.")
    advanced_features: List[str] = Field(..., description="Advanced extension features.")
    tech_stack: List[str] = Field(..., description="Recommended technology components.")
    architecture: List[str] = Field(..., description="Architectural layers and components.")
    roadmap: List[str] = Field(..., description="Phased timeline milestones.")
    datasets: List[str] = Field(default_factory=list, description="Relevant public datasets or synthetic data sources.")
    risks: List[str] = Field(default_factory=list, description="Known technical and timeline bottlenecks.")
    improvements: List[str] = Field(default_factory=list, description="Actionable opportunities for refinement.")


class GenerateProjectsResponse(BaseModel):
    projects: List[ProjectIdea] = Field(..., description="List of exactly 3 curated project ideas.")

    @model_validator(mode="after")
    def validate_three_projects(self) -> "GenerateProjectsResponse":
        if len(self.projects) != 3:
            raise ValueError(f"GenerateProjectsResponse must contain exactly 3 project ideas, received {len(self.projects)}.")
        return self
