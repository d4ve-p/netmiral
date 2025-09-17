from typing import Optional
from beanie import Document, Indexed

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
    name: Indexed(str, unique=True) 
    device_type: DeviceType

    ip_address: Optional[str] = None # Required if active
    status: Optional[DeviceStatus] = 'unknown' # required if active

    credentials: Optional[DeviceCredentials] = None

    config_text = None # Required for both
    
    # --- Optional Metadata Fields ---
    model: Optional[str] = None     
    os_version: Optional[str] = None 
    
    class Settings:
        name = "devices"
    
DOCUMENT_MODELS.append(NetworkDevice)