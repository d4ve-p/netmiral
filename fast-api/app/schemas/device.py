from beanie import PydanticObjectId
from pydantic import BaseModel, IPvAnyAddress, field_serializer
from typing import Optional

from datetime import datetime

from ..types.device import *

class CreateDeviceCredentials(BaseModel):
    username: str
    password: str
    enable_password: Optional[str] = None

class UpdateDeviceCredentials(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    enable_password: Optional[str] = None

class NetworkDeviceBase(BaseModel):
    hostname: str
    location: Optional[str] = None # e.g., 'Data Center 1', 'Office 2'
    
    # --- Optional Metadata Fields ---
    model: Optional[str] = None     
    os_version: Optional[str] = None

class ActiveNetworkDevice(NetworkDeviceBase):
    device_type: DeviceType = DeviceType.ACTIVE

    ip_address: IPvAnyAddress
    config_text: Optional[str] = None

class CreateLocalNetworkDevice(NetworkDeviceBase):
    device_type: DeviceType = DeviceType.LOCAL

class CreateActiveNetworkDevice(ActiveNetworkDevice):
    credentials: CreateDeviceCredentials

class ShowNetworkDevice(NetworkDeviceBase):
    id: PydanticObjectId
    created_at: datetime
    config_text: Optional[str]
    device_type: DeviceType

    @field_serializer('id')
    def serialize_id(self, id: PydanticObjectId, _info):
        return str(id)
    
    class Config:
        from_attributes = True


class ShowActiveNetworkDevice(ShowNetworkDevice):
    ip_address: Optional[IPvAnyAddress]
    status: DeviceStatus

class UpdateLocalNetworkDevice(CreateLocalNetworkDevice):
    id: str
    config_text: Optional[str] = None

class UpdateActiveNetworkDevice(ActiveNetworkDevice):
    id: str
    credentials: Optional[UpdateDeviceCredentials] = None

class DeleteNetworkDevice(BaseModel):
    id: str