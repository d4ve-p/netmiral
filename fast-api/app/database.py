import os
import logging as Logging

from pymongo import AsyncMongoClient
from beanie import init_beanie
from .models import DOCUMENT_MODELS

MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb://localhost:27017")

async def init_db():
    """_summary_
    Create a PyMongo async client.
    """
    client = AsyncMongoClient(MONGO_DETAILS)
    
    await init_beanie(
        database=client.netmiral,
        document_models=DOCUMENT_MODELS,
    )

    Logging.info("Connected to MongoDB")
