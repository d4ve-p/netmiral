from fastapi import Form
from typing import Optional

from ..models.NetworkDevice import DeviceStatus
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
            os_version=self.os_version
        )

class CreateActiveDeviceForm(CreateLocalDeviceForm):
    def __init__(
        self,
        hostname: str = Form(...),
        location: Optional[str] = Form(None),
        model: str = Form(None),
        os_version: str = Form(None),

        ip_address: str = Form(...),
        status: DeviceStatus = Form(...),

        cred_username: str = Form(...),
        cred_password: str = Form(...),
        cred_enable_password: Optional[str] = Form(None)
    ):
        super(hostname, location, model, os_version)
        
        self.ip_address = ip_address
        self.status = status

        self.credentials = device.DeviceCredentials(
            username=cred_username,
            password=cred_password,
            enable_password=cred_enable_password
        )

        return device.CreateActiveNetworkDevice(
            hostname=self.hostname,
            location=self.location,
            model=self.model,
            os_version=self.os_version,
            ip_address=self.ip_address,
            status=self.status,
            credentials=self.credentials
        )