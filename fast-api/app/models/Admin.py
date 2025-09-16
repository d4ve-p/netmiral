from beanie import Document
from passlib.context import CryptContext

from . import DOCUMENT_MODELS

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Admin(Document):
    hashed_password: str

DOCUMENT_MODELS.append(Admin)