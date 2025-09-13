
from fastapi import HTTPException, status

from ..models.Admin import Admin
from ..schemas import CreateAdmin, ValidateAdmin
from . import security_service

async def create_admin(admin_data: CreateAdmin):
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

async def validate_admin(admin_data: ValidateAdmin):
    admin = await Admin.find_one()
    
    if not admin or not security_service.verify_password(admin_data.password, admin.hashed_password):
        return False
    
    return True

async def has_admin():
    admin = await Admin.find_one()
    return admin is not None