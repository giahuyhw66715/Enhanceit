from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routes.tool_route import router as tool_router
from routes.upload_route import router as upload_router
from routes.photo_route import router as photo_router
from routes.tag_route import router as tag_router
from routes.auth_route import router as auth_router
from routes.payment_route import router as payment_router
from routes.auth_route import get_current_user, require_admin
from routes.user_route import router as user_router
from models.auth_model import User
from config.database import user_collection, tool_collection, photo_collection

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/stats")
async def get_statistics(current_user: User = Depends(require_admin)):
    """
    Return the number of users, tools, and photos
    """
    users_count = user_collection.count_documents({})
    tools_count = tool_collection.count_documents({})
    photos_count = photo_collection.count_documents({})

    return {
        "users": users_count,
        "tools": tools_count,
        "photos": photos_count
    }

app.include_router(upload_router)    
app.include_router(tool_router)
app.include_router(photo_router)
app.include_router(tag_router)
app.include_router(auth_router)
app.include_router(payment_router)
app.include_router(user_router)
