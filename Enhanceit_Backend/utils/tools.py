from fastapi import UploadFile, File
from PIL import Image
from io import BytesIO
import cv2
import numpy as np

async def get_image(file: UploadFile = File(...)):
    content = await file.read()
    return Image.open(BytesIO(content))

def convert_from_cv2_to_pil(image):
    return Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

def convert_from_pil_to_cv2(image):
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

def return_image(image, format = "png"):
    buffer = BytesIO()
    image.save(buffer, format=format)
    buffer.seek(0)
    return buffer.getvalue()


