from beanie import Document, Indexed, PydanticObjectId
from pydantic import Field, IPvAnyAddress
from typing import Optional


import datetime


from . import DOCUMENT_MODELS
from ..schemas import device as device_schema
from ..types.device import *

class NetworkDevice(Document):
    id: Optional[PydanticObjectId] = Field(default=None, alias='_id')

    hostname: Indexed(str, unique=True) 
    device_type: DeviceType
    location: Optional[str] # e.g., 'Data Center 1', 'Office 2'

    ip_address: Optional[IPvAnyAddress] = None # Required if active
    status: Optional[DeviceStatus] = 'unknown' # required if active

    credentials: Optional[device_schema.CreateDeviceCredentials] = None

    config_text: Optional[str]
    
    # --- Optional Metadata Fields ---
    model: Optional[str] = None     
    os_version: Optional[str] = None 

    created_at: datetime.datetime = Field(default_factory=lambda: datetime.datetime.now(datetime.timezone.utc))
    
    class Settings:
        name = "devices"
    
DOCUMENT_MODELS.append(NetworkDevice)