from typing import Optional
from beanie import Document, Indexed

from . import DOCUMENT_MODELS

class NetworkDevice(Document):
    ip_address: Indexed(str, unique=True)
    hostname: Optional[str]
    model: Optional[str] # e.g., 'Cisco 2901'
    os_version: Optional[str] # e.g., 'IOS 15.2', 
    location: Optional[str] # e.g., 'Data Center 1', 'Office 2'
    status: Optional[str]  # e.g., 'active', 'inactive', 'maintenance'
    
DOCUMENT_MODELS.append(NetworkDevice)