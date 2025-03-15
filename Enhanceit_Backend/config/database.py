from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))

db = client["EnhanceIt"]

tool_collection = db["tools"]
photo_collection = db["photos"]
tag_collection = db["tags"]
user_collection = db["users"]
refresh_tokens_collection = db["refresh_tokens"]