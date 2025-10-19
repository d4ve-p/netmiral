from datetime import timedelta

from fastapi import HTTPException, status

from .. import constants
from ..models.Admin import Admin
from ..models.Token import Token
from ..schemas import admin as admin_schema
from . import security_service

async def create_admin(admin_data: admin_schema.CreateAdmin):
    existing_admin = await Admin.find_one()
    
    if existing_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Admin already exists"
        )
    
    hash_password = security_service.hash_password(admin_data.password)
    
    new_admin = Admin(
        hashed_password=hash_password
    )
    
    await new_admin.insert()
    
    return {"message": "Admin created successfully"}

async def validate_admin(admin_data: admin_schema.ValidateAdmin):
    admin = await Admin.find_one()
    
    if not admin or not security_service.verify_password(admin_data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    access_token_expires = timedelta(minutes=constants.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security_service.create_access_token(
        data={"sub": Admin.id}, expired_delta=access_token_expires
    )

    return Token(access_token=access_token, token_type="bearer")

async def has_admin():
    admin = await Admin.find_one()
    return admin is not None