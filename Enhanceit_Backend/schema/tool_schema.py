def individual_serial(tool) -> dict:
    return {
        "id": str(tool["_id"]),
        "title": tool["title"],
        "image": tool["image"],
        "description": tool["description"],
        "input": tool["input"],
        "output": tool["output"],
        "slug": tool["slug"],
        "faqs": tool["faqs"],
    }

def list_serial(tools) -> list:
    return [individual_serial(tool) for tool in tools]