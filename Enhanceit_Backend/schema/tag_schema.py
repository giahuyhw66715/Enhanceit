def individual_serial(tag) -> dict:
    return {
        "id": str(tag["_id"]),
        "name": tag["name"],
        "slug": tag["slug"],
    }

def list_serial(tags) -> list:
    return [individual_serial(tag) for tag in tags]