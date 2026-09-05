from typing import List
from pydantic import BaseModel, Field, field_validator
from .project import GenerateProjectsRequest, ProjectIdea


class MentorRequest(BaseModel):
    project: ProjectIdea = Field(..., description="Selected project context.")
    student_context: GenerateProjectsRequest = Field(..., description="Student skills and constraints.")
    question: str = Field(
        ...,
        min_length=1,
        description="Specific question directed to the technical mentor.",
        examples=["How can I make this project more innovative?", "Can our team complete this in 8 weeks?"],
    )

    @field_validator("question")
    @classmethod
    def validate_question(cls, val: str) -> str:
        cleaned = val.strip()
        if not cleaned:
            raise ValueError("Mentor question cannot be empty.")
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
