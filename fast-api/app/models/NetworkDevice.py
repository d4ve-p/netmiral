from beanie import Document, Indexed
from pydantic import Field
from typing import Optional


from datetime import datetime
from enum import Enum

from . import DOCUMENT_MODELS
from ..schemas import DeviceCredentials

class DeviceType(str, Enum):
    ACTIVE = 'active'
    LOCAL = 'local'

class DeviceStatus(str, Enum):
    ONLINE = 'online'
    OFFLINE = 'offline'
    UNKNOWN = 'unknown'

class NetworkDevice(Document):
    hostname: Indexed(str, unique=True) 
    device_type: DeviceType
    location: Optional[str] # e.g., 'Data Center 1', 'Office 2'

    ip_address: Optional[str] = None # Required if active
    status: Optional[DeviceStatus] = 'unknown' # required if active

    credentials: Optional[DeviceCredentials] = None

    config_text = None # Required for both
    
    # --- Optional Metadata Fields ---
    model: Optional[str] = None     
    os_version: Optional[str] = None 

    created_at: datetime = Field(default_factory=datetime.timezone.utc)
    
    class Settings:
        name = "devices"
    
DOCUMENT_MODELS.append(NetworkDevice)