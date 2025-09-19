from fastapi import Form
from typing import Optional

from ..types.device import DeviceStatus
from ..schemas import device

class CreateLocalDeviceForm:
    def __init__(
        self,
        hostname: str = Form(...),
        location: Optional[str] = Form(None),
        model: str = Form(None),
        os_version: str = Form(None),
    ):
        self.hostname = hostname
        self.location = location
        self.model = model
        self.os_version = os_version
        
    def to_schema(self) -> device.CreateLocalNetworkDevice:
        return device.CreateLocalNetworkDevice(
            hostname=self.hostname,
            location=self.location,
            model=self.model,
            os_version=self.os_version,
        )

