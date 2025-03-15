def individual_serial(photo) -> dict:
    return {
        "id": str(photo["_id"]),
        "title": photo["title"],
        "tags": photo["tags"],
        "url": photo["url"],
        "author": photo["author"],
        "resolution": photo["resolution"],
        "file_size": photo["file_size"],
        "created_at": photo["created_at"],
        "updated_at": photo["updated_at"],
    }

def list_serial(photos) -> list:
    return [individual_serial(photo) for photo in photos]