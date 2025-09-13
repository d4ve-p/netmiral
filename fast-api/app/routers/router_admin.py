from fastapi import APIRouter, status

from ..schemas import CreateAdmin, ValidateAdmin
from ..services import admin_service

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)

@router.get("/", status_code=status.HTTP_200_OK)
async def check_admin():
    """
    API endpoint to check if an admin user exists.
    """
    
    exists = await admin_service.has_admin()
    return {"admin_exists": exists}

@router.post("/validate", status_code=status.HTTP_200_OK)
async def validate_admin(admin: ValidateAdmin):
    """
    API endpoint to validate admin credentials.
    """
    
    is_valid = await admin_service.validate_admin(admin)
    return {"is_valid": is_valid}

@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_admin(admin: CreateAdmin):
    """
    API endpoint to create a new admin user.
    """
    
    new_admin = await admin_service.create_admin(admin)
    return new_admin