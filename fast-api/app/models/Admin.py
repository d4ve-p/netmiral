from pydantic import BaseModel

from . import DOCUMENT_MODELS

class Admin(BaseModel):
    password: str

DOCUMENT_MODELS.append(Admin)