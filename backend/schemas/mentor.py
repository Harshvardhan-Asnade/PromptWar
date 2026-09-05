from typing import List
from pydantic import BaseModel, Field, field_validator
from .project import GenerateProjectsRequest, ProjectIdea


class MentorRequest(BaseModel):
    project: ProjectIdea = Field(..., description="Selected project context.")
    student_context: GenerateProjectsRequest = Field(..., description="Student skills and constraints.")
    question: str = Field(
        ...,
        min_length=3,
        max_length=1000,
        description="Specific question directed to the technical mentor (3 to 1000 characters).",
        examples=["How can I make this project more innovative?", "Can our team complete this in 8 weeks?"],
    )

    @field_validator("question")
    @classmethod
    def validate_question(cls, val: str) -> str:
        cleaned = val.strip()
        if len(cleaned) < 3:
            raise ValueError("Mentor question must be at least 3 characters long.")
        if len(cleaned) > 1000:
            raise ValueError("Mentor question cannot exceed 1000 characters.")
        return cleaned


class MentorResponse(BaseModel):
    answer: str = Field(..., description="Contextual mentorship guidance addressing the query.")
    recommended_next_action: str = Field(
        ..., description="Immediate concrete engineering or research task to execute next."
    )
    key_takeaways: List[str] = Field(..., description="Core actionable takeaways for the team.")
    relevant_risks: List[str] = Field(
        default_factory=list, description="Project risks pertinent to the student's question."
    )

    @field_validator("key_takeaways", "relevant_risks", mode="before")
    @classmethod
    def coerce_list_of_strings(cls, val):
        if isinstance(val, str):
            lines = [line.lstrip("-*• ").strip() for line in val.split("\n") if line.strip()]
            return lines if lines else [val.strip()]
        return val
