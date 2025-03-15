from slugify import slugify

def create_slug(cls, values) -> dict:
        if "title" in values:
            values["slug"] = slugify(values["title"])
        elif "name" in values:
            values["slug"] = slugify(values["name"])
        return values