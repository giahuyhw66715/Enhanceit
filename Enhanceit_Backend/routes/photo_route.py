from fastapi import APIRouter, Query
from models.photo_model import Photo
from config.database import photo_collection
from schema.photo_schema import individual_serial, list_serial
from bson import ObjectId
from routes import tag_route
import math
from typing import List, Optional

router = APIRouter(prefix="/api/photos", tags=["photos"])

@router.get("/")
async def get_all_photos(
    page: int = Query(1, alias="page", ge=1),  # Số trang (page) bắt đầu từ 1
    limit: int = Query(10, alias="limit", le=100),  # Giới hạn số lượng item mỗi trang (max 100),
    tags: Optional[List[str]] = Query(None, alias="tags"),
    title: Optional[str] = Query(None, alias="title"),
):
    skip = (page - 1) * limit  # Tính số lượng item cần bỏ qua
     # Tạo điều kiện lọc (filter)
    query = {}
    if tags:
        query["tags.slug"] = {"$all": tags}  # Lọc các ảnh có ít nhất một tag khớp
    if title is not None and title != "":
        query["title"] = {"$regex": title, "$options": "i"}

    total_items = photo_collection.count_documents(query)  # Tổng số item trong collection
    total_pages = math.ceil(total_items / limit)  # Tính tổng số trang

    # Lấy danh sách wallpaper theo pagination
    photos = photo_collection.find(query).skip(skip).limit(limit).sort("created_at", -1)

    return {
        "data": list_serial(photos),
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
        "total_items": total_items,
    }


@router.get("/{id}")
async def get_photo(id: str):
    photo = photo_collection.find_one({"_id": ObjectId(id)})
    return individual_serial(photo)

@router.get("/{id}/related")
async def get_related_photos(id: str):
    photo = photo_collection.find_one({"_id": ObjectId(id)})
    tags = photo["tags"]
    related_photos = photo_collection.aggregate([
        {"$match": {"tags": {"$in": tags}, "_id": {"$ne": ObjectId(id)}}},
        {"$sample": {"size": 12}}
    ])
    return list_serial(related_photos)


@router.post("/")
async def create_photo(photo: Photo):
    photo_dict = dict(photo)
    tags = [await tag_route.get_tag_by_slug(tag) for tag in photo_dict["tags"]]
    photo_dict["tags"] = [dict(tag) for tag in tags]
    photo_collection.insert_one(photo_dict)
    return {"message": "Photo created successfully"}

@router.put("/{id}")
async def update_photo(id: str, photo: Photo):
    photo_dict = dict(photo)
    tags = [await tag_route.get_tag_by_slug(tag) for tag in photo_dict["tags"]]
    photo_dict["tags"] = [dict(tag) for tag in tags]
    photo_collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": photo_dict})
    return {"message": "Photo updated successfully"}


@router.delete("/{id}")
async def delete_photo(id: str):
    photo_collection.find_one_and_delete({"_id": ObjectId(id)})
    return {"message": "Photo deleted successfully"}
