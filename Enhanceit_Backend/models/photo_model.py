from pydantic import BaseModel, Field, model_validator
from typing import List
from datetime import datetime, timezone
from typing import Optional
from utils.generate_slug import create_slug


class Tag(BaseModel):
    name: str
    slug: Optional[str] = None

    class Config:
        populate_by_name = True

    @model_validator(mode="before")
    def generate_slug(cls, values):
        return create_slug(cls, values)

class Photo(BaseModel):
    title: str
    tags: List[Tag | str] = []
    url: str
    author: str
    resolution: str
    file_size: float  # Kích thước file tính bằng MB
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
