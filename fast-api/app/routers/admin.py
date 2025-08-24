from fastapi import APIRouter, status

from ..schemas import AdminCreate
from ..services import admin_service

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_admin(admin: AdminCreate):
    """
    API endpoint to create a new admin user.
    """
    
    new_admin = await admin_service.create_admin(admin)
    return new_admin
