import cloudinary
from cloudinary.uploader import upload
import os
from fastapi import UploadFile, File
from fastapi import APIRouter
from dotenv import load_dotenv
import json
from fastapi.responses import Response

router = APIRouter(prefix="/api/upload", tags=["upload"])
load_dotenv()

# Configuration for Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)

# Upload route
@router.post("/")
async def upload_image(file: UploadFile = File(...)):
    try:
        result = upload(file.file, folder="EnhanceIt")
        image_info = {
            "width": result["width"],
            "height": result["height"],
            "format": result["format"],
            "secure_url": result["secure_url"],
            "file_size": result["bytes"]
        }
        return Response(content=json.dumps(image_info), media_type="application/json")
    except Exception as e:
        return {"error": str(e)}