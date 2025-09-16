from fastapi import APIRouter, status, Response

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
async def validate_admin(admin: ValidateAdmin, response: Response):
    """
    API endpoint to validate admin credentials.
    """
    
    token = await admin_service.validate_admin(admin)

    response.set_cookie(
        key="auth_token",
        value=f"Bearer {token.access_token}",
        httponly=True,
        secure=False, 
        samesite="lax",
        path="/"
    )

    return {"is_valid": True}

@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_admin(admin: CreateAdmin):
    """
    API endpoint to create a new admin user.
    """
    
    new_admin = await admin_service.create_admin(admin)
    return new_admin