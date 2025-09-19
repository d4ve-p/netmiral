from fastapi import APIRouter, status, Response, UploadFile, Depends

from ..schemas.device import *
from ..dependencies import device_dependencies
from ..services import device_service

router = APIRouter(
    prefix="/device",
    tags=["Device"]
)

@router.post("/local", status_code=status.HTTP_201_CREATED)
async def create_local_network_device(
    file: UploadFile,
    form_data: device_dependencies.CreateLocalDeviceForm = Depends()
):
    device_schema = form_data.to_schema()

    return await device_service.create_local_device(device_schema, file)

@router.post("/active", status_code=status.HTTP_201_CREATED)
async def create_active_network_device(
    schema: CreateActiveNetworkDevice
):
    return await device_service.create_active_device(schema)

@router.delete("/", status_code=status.HTTP_200_OK)
async def delete_network_device(
    schema: DeleteNetworkDevice
):
    id = schema.id
    return await device_service.delete_device(id)

