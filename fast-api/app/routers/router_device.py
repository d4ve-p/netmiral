from fastapi import APIRouter, status, Response, UploadFile, Depends

from ..schemas.device import *
from ..dependencies import device_dependencies
from ..services import device_service

router = APIRouter(
    prefix="/device",
    tags=["Device"]
)

@router.get("/", status_code=status.HTTP_200_OK)
async def get_device(
    id: str = None,
    search: str = None
):
    if search:
        return await device_service.get_search_device(search)
    
    if id:
        return await device_service.get_device(id)
    
    return await device_service.get_all_devices()
    

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

@router.put("/local", status_code=status.HTTP_200_OK)
async def update_local_device(
    schema: UpdateLocalNetworkDevice
):
    return await device_service.update_local_device(schema)

@router.put("/active", status_code=status.HTTP_200_OK)
async def update_active_device(
    schema: UpdateActiveNetworkDevice
):
    return await device_service.update_active_device(schema)
