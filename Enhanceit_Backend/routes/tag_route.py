from fastapi import APIRouter, HTTPException
from models.photo_model import Tag
from config.database import tag_collection
from schema.tag_schema import individual_serial, list_serial
from bson import ObjectId

router = APIRouter(prefix="/api/tags", tags=["tags"])

@router.get("/")
async def get_all_tags():
    tags = tag_collection.find()
    return list_serial(tags)

@router.get("/{slug}")
async def get_tag_by_slug(slug: str):
    tag = tag_collection.find_one({"slug": slug})
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    return individual_serial(tag)

@router.post("/")
async def create_tag(tag: Tag):
    tag_exist = tag_collection.find_one({"slug": tag.slug})
    if tag_exist:
        raise HTTPException(status_code=400, detail="Tag already exists")
    tag_dict = dict(tag)
    tag_collection.insert_one(tag_dict)
    return {"message": "Tag created successfully"}

@router.put("/{slug}")
async def update_tag(slug: str, tag: Tag):
    tag_dict = dict(tag)
    tag_collection.find_one_and_update({"slug": slug}, {"$set": tag_dict})
    return {"message": "Tag updated successfully"}

@router.delete("/{slug}")
async def delete_tag(slug: str):
    tag_collection.find_one_and_delete({"slug": slug})
    return {"message": "Tag deleted successfully"}