from models.auth_model import User

def individual_serial(user: User) -> dict:
    return {
        "id": str(user["_id"]),
        "fullname": user["fullname"],
        "email": user["email"],
        "role": user["role"],
        "credits": user["credits"],
        "subscription_plan": user["subscription_plan"],
        "subscription_expires": user["subscription_expires"],     
    }

def list_serial(tags) -> list:
    return [individual_serial(tag) for tag in tags]