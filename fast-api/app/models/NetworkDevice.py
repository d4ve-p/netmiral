from beanie import Document, Indexed
from pydantic import Field
from typing import Optional


import datetime


from . import DOCUMENT_MODELS
from ..schemas import device as device_schema
from ..types.device import *

class NetworkDevice(Document):
    hostname: Indexed(str, unique=True) 
    device_type: DeviceType
    location: Optional[str] # e.g., 'Data Center 1', 'Office 2'

    ip_address: Optional[str] = None # Required if active
    status: Optional[DeviceStatus] = 'unknown' # required if active

    credentials: Optional[device_schema.DeviceCredentials] = None

    config_text: Optional[str]
    
    # --- Optional Metadata Fields ---
    model: Optional[str] = None     
    os_version: Optional[str] = None 

    created_at: datetime.datetime = Field(default_factory=lambda: datetime.datetime.now(datetime.timezone.utc))
    
    class Settings:
        name = "devices"
    
DOCUMENT_MODELS.append(NetworkDevice)