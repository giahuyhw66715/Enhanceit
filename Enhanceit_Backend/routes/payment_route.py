from fastapi import APIRouter, HTTPException
import stripe
from models.payment_model import CheckoutSessionRequest
import os
from dotenv import load_dotenv
from fastapi import Request
from datetime import datetime, timedelta
from config.database import user_collection

router = APIRouter(prefix="/api/payment", tags=["payment"])
load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
CLIENT_URL = os.getenv("CLIENT_URL")

# Endpoint tạo checkout session
@router.post("/create-checkout-session")
async def create_checkout_session(request: CheckoutSessionRequest):
    price_id_mapping = {
        "pro": "price_1QxlndJZw5H6MHEUtYr2XBfs",
        "premium": "price_1QxlosJZw5H6MHEUwLduCuIr"
    }
    
    price_id = price_id_mapping.get(request.plan)
    if not price_id:
        raise HTTPException(status_code=400, detail="Invalid plan")

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="subscription",
            customer_email=request.user_email,
            line_items=[{"price": price_id, "quantity": 1}],
            success_url=f"{CLIENT_URL}/payment/success",
            cancel_url=f"{CLIENT_URL}/payment/cancel"
        )
        return {"checkout_url": session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, WEBHOOK_SECRET)
    except Exception as e:
        return {"error": str(e)}

    if event["type"] == "invoice.payment_succeeded":
        subscription_data = event["data"]["object"]
        user_email = subscription_data["customer_email"]
        plan = subscription_data["lines"]["data"][0]["price"]["id"]

        # Cập nhật user vào database
        user = user_collection.find_one({"email": user_email})
        if user:
            new_plan = "pro" if plan == "price_1QxlndJZw5H6MHEUtYr2XBfs" else "premium"
            user_collection.update_one(
                {"email": user_email},
                {"$set": {"subscription_plan": new_plan, "subscription_expires": datetime.utcnow() + timedelta(days=30), "credits": new_plan == "pro" and user.get("credits") + 100}}
            )

    return {"status": "success"}