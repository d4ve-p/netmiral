from pydantic import BaseModel
from typing import Optional

class AdminCreate(BaseModel):
    password: str

class NetworkDeviceCreate(BaseModel):
    ip_address: str
    hostname: Optional[str]
    model: Optional[str] # e.g., 'Cisco 2901'
    os_version: Optional[str] # e.g., 'IOS 15.2', 
    location: Optional[str] # e.g., 'Data Center 1', 'Office 2'