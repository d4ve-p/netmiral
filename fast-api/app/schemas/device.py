from pydantic import BaseModel, Field
from typing import Optional

from datetime import datetime

from ..models.NetworkDevice import DeviceStatus, DeviceCredentials, DeviceType

class NetworkDeviceBase(BaseModel):
    hostname: Optional[str]
    location: Optional[str] # e.g., 'Data Center 1', 'Office 2'
    device_type: DeviceType
    
    ip_address: Optional[str] = None # Required if active
    status: Optional[DeviceStatus] = 'unknown' # required if active
    
    # --- Optional Metadata Fields ---
    model: Optional[str] = None     
    os_version: Optional[str] = None

class CreateLocalNetworkDevice(NetworkDeviceBase):
    device_type = DeviceType.LOCAL

class CreateActiveNetworkDevice(NetworkDeviceBase):
    device_type = DeviceType.ACTIVE
    credentials: DeviceCredentials = None

class ShowNetworkDevice(NetworkDeviceBase):
    id: str = Field(..., alias="_id")
    created_at: datetime
    config_text: str

class DeviceCredentials(BaseModel):
    username: str
    password: str
    enable_password: Optional[str] = None