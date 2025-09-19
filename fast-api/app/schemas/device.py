from pydantic import BaseModel, Field
from typing import Optional

from datetime import datetime

from ..types.device import *

class DeviceCredentials(BaseModel):
    username: str
    password: str
    enable_password: Optional[str] = None

class NetworkDeviceBase(BaseModel):
    hostname: str
    location: Optional[str] # e.g., 'Data Center 1', 'Office 2'
    
    # --- Optional Metadata Fields ---
    model: Optional[str] = None     
    os_version: Optional[str] = None

class CreateLocalNetworkDevice(NetworkDeviceBase):
    device_type: DeviceType = DeviceType.LOCAL

class CreateActiveNetworkDevice(NetworkDeviceBase):
    device_type: DeviceType = DeviceType.ACTIVE

    credentials: DeviceCredentials
    ip_address: str
    status: DeviceStatus
    config_text: Optional[str]

class ShowNetworkDevice(NetworkDeviceBase):
    id: str = Field(..., alias="_id")
    created_at: datetime
    config_text: Optional[str]
