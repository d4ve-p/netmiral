from typing import Union

from ..models import NetworkDevice
from ..schemas import device as device_schema

def device_create_schema_to_model(
        schema: Union[device_schema.CreateLocalNetworkDevice, device_schema.CreateActiveNetworkDevice]
) -> NetworkDevice:
    common_data = schema.model_dump(exclude_unset=True)

    common_data.pop('credentials', None)
    common_data.pop('ip_address', None)
    common_data.pop('status', None)

    model = NetworkDevice.NetworkDevice(
        hostname=schema.hostname,
        device_type=schema.device_type,
        location=schema.location,
        model=schema.model,
        os_version=schema.os_version
    )

    if schema.device_type == NetworkDevice.DeviceType.ACTIVE:
        model.credentials = schema.credentials
        model.ip_address = schema.ip_address
        model.status = schema.status
    
    return model

def device_model_to_show_schema(model: NetworkDevice) -> device_schema.ShowNetworkDevice:
    return device_schema.ShowNetworkDevice(
        hostname=model.hostname,
        device_type=model.device_type,
        location=model.location,
        ip_address=model.ip_address,
        status=model.status,
        model=model.model,
        os_version=model.os_version,
        
        config_text=model.config_text,
        created_at=model.created_at
    )