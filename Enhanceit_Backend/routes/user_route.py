from fastapi import APIRouter
from models.auth_model import User, UserUpdate
from config.database import user_collection
from schema.auth_schema import list_serial, individual_serial
from bson import ObjectId
from routes.auth_route import pwd_context

router = APIRouter(prefix="/api/users", tags=["users"])

@router.get("/")
async def get_all_users():
    users = user_collection.find()
    return list_serial(users)

@router.get("/{id}")
async def get_user(id: str):
    user = user_collection.find_one({"_id": ObjectId(id)})
    return individual_serial(user)

@router.post("/")
async def create_user(user: User):
    user_dict = dict(user)
    user_collection.insert_one(user_dict)
    return {"message": "User created successfully"}

@router.delete("/{id}")
async def delete_user(id: str):
    user_collection.find_one_and_delete({"_id": ObjectId(id)})
    return {"message": "User deleted successfully"}

@router.put("/{id}")
async def update_user(id: str, user: UserUpdate):
    if (user.password):
        user.password = pwd_context.hash(user.password)

    user_dict = user.model_dump(exclude_unset=True)
    user_dict = {k: v for k, v in user_dict.items() if v not in [None, ""]}

    user_collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": user_dict})
    return {"message": "Updated successfully"}
