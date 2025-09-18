from pydantic import BaseModel

class ValidateAdmin(BaseModel):
    password: str

class CreateAdmin(BaseModel):
    password: str