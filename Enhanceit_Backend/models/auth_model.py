from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from datetime import datetime
from models.payment_model import SubscriptionPlan

class Role(str, Enum):
    user = "user"
    admin = "admin"

class User(BaseModel):
    email: EmailStr
    password: str
    fullname: str
    role: Role = Role.user
    subscription_plan: SubscriptionPlan = SubscriptionPlan.free  # Mặc định là free
    subscription_expires: Optional[datetime] = None  # Ngày hết hạn gói
    credits: int = 5  # Credits còn lại

class UserUpdate(BaseModel):
    email: EmailStr
    password: Optional[str] = None
    fullname: str
    role: Role = Role.user
    subscription_plan: SubscriptionPlan = SubscriptionPlan.free  # Mặc định là free
    subscription_expires: Optional[datetime] = None  # Ngày hết hạn gói
    credits: int = 5  # Credits còn lại

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    refresh_token: str

class RefreshToken(BaseModel):
    refresh_token: str