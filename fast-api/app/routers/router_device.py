from fastapi import APIRouter, status, Response, UploadFile, Depends

from ..dependencies import device_dependencies
from ..services import device_service

router = APIRouter(
    prefix="/device",
    tags=["Device"]
)

@router.post("/local", status_code=status.HTTP_201_CREATED)
async def create_network_device(
    file: UploadFile,
    form_data: device_dependencies.CreateLocalDeviceForm = Depends()
):
    print("a")
    device_schema = form_data.to_schema()

    return await device_service.create_local_device(device_schema, file)

