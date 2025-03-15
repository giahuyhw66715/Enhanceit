from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from jose import jwt, JWTError
from models.auth_model import User, Token, UserLogin, Role, RefreshToken
from config.database import user_collection, refresh_tokens_collection
from passlib.context import CryptContext
import os
from bson import ObjectId
from schema.auth_schema import individual_serial
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/auth", tags=["auth"])

# 🔹 Cấu hình JWT
SECRET_KEY = os.getenv("ACCESS_SECRET_KEY")
REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# ✅ Hàm tạo JWT (dùng chung cho Access & Refresh Token)
def create_jwt_token(user_id: str, secret_key: str, expires_delta: timedelta):
    expire = datetime.utcnow() + expires_delta
    payload = {
        "sub": user_id,  # ✅ Lưu user_id vào JWT
        "exp": expire,
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, secret_key, algorithm=ALGORITHM)


# ✅ Middleware Xác thực JWT
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = user_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        # Check subscription plan and expiration date
        if user["subscription_expires"] and user["subscription_expires"] < datetime.utcnow():
            user_collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"subscription_plan": "free", "subscription_expires": None}})

            user = user_collection.find_one({"_id": ObjectId(user_id)})

        return individual_serial(user)
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    
async def require_admin(current_user: User = Depends(get_current_user)):
    if current_user.get("role") != Role.admin:
        raise HTTPException(status_code=403, detail="Access forbidden: Admins only")
    return current_user

# ✅ API đăng ký user mới
@router.post("/register", response_model=Token)
async def register(user_data: User):
    existing_user = user_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_data.password = pwd_context.hash(user_data.password)
    new_user = user_collection.insert_one(dict(user_data))
    user_id = str(new_user.inserted_id)

    # ✅ Tạo access token & refresh token
    access_token = create_jwt_token(user_id, SECRET_KEY, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_jwt_token(user_id, REFRESH_SECRET_KEY, timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))

    # ✅ Lưu refresh token vào database
    refresh_tokens_collection.update_one(
        {"user_id": user_id},
        {"$set": {"refresh_token": refresh_token}},
        upsert=True
    )

    return {"access_token": access_token, "refresh_token": refresh_token}

# ✅ API đăng nhập (Login)
@router.post("/login", response_model=Token)
async def login(loginUser: UserLogin):
    user = user_collection.find_one({"email": loginUser.email})
    if not user or not pwd_context.verify(loginUser.password, user["password"]):
        raise HTTPException(status_code=400, detail="Email or password is incorrect")

    user_id = str(user["_id"])
    # ✅ Tạo access token & refresh token
    access_token = create_jwt_token(user_id, SECRET_KEY, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_jwt_token(user_id, REFRESH_SECRET_KEY, timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))

    # ✅ Lưu refresh token vào database
    refresh_tokens_collection.update_one(
        {"user_id": user_id},
        {"$set": {"refresh_token": refresh_token}},
        upsert=True
    )

    return {"access_token": access_token, "refresh_token": refresh_token}

# ✅ API làm mới Access Token (Refresh Token)
@router.post("/refresh_token", response_model=Token)
async def refresh_access_token(token: RefreshToken):
    try:
        payload = jwt.decode(token.refresh_token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid refresh token")

        # ✅ Kiểm tra refresh token có hợp lệ không
        stored_token = refresh_tokens_collection.find_one({"user_id": user_id})
        if not stored_token or stored_token["refresh_token"] != token.refresh_token:
            raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

        # ✅ Tạo mới access token
        new_access_token = create_jwt_token(user_id, SECRET_KEY, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

        return {"access_token": new_access_token, "refresh_token": token.refresh_token}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

@router.get("/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user


