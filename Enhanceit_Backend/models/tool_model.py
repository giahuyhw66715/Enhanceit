from pydantic import BaseModel, model_validator
from typing import List, Optional
from utils.generate_slug import create_slug
from enum import Enum

class ToolSlug(str, Enum):
    BACKGROUND_REMOVER = "background-remover"
    IMAGE_COLORIZATION = "image-colorization"
    CARTOONIZE = "cartoonize"
    IMAGE_DENOISER = "image-denoiser"
    IMAGE_UPSCALER = "image-upscaler"
    GRAYSCALE = "grayscale"
    FACE_RETOUCHING = "face-retouching"
    BLUR_BACKGROUND = "blur-background"
    IMAGE_BRIGHTENER = "image-brightener"

class FAQs(BaseModel):
    question: str
    answer: str

class Tool(BaseModel):
    title: str
    description: str
    image: str
    input: str
    output: str
    slug: Optional[str] = None
    faqs: Optional[List[FAQs]] = []

    class Config:
        populate_by_name = True

    @model_validator(mode="before")
    def generate_slug(cls, values):
        return create_slug(cls, values)