from enum import Enum
from pydantic import BaseModel

class SubscriptionPlan(str, Enum):
    free = "free"
    pro = "pro"
    premium = "premium"

class CheckoutSessionRequest(BaseModel):
    plan: SubscriptionPlan  # "pro" hoặc "premium"
    user_email: str