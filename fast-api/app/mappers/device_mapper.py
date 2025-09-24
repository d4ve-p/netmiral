from typing import Union

from ..models.NetworkDevice import NetworkDevice
from ..schemas import device as device_schema
from ..types.device import DeviceType

def device_create_schema_to_model(
        schema: Union[device_schema.CreateLocalNetworkDevice, device_schema.CreateActiveNetworkDevice]
) -> NetworkDevice:
    common_data = schema.model_dump(exclude_unset=True)

    common_data.pop('credentials', None)
    common_data.pop('ip_address', None)
    common_data.pop('status', None)

    model = NetworkDevice(
        hostname=schema.hostname,
        device_type=schema.device_type,
        location=schema.location,
        model=schema.model,
        os_version=schema.os_version,
        config_text=""
    )

    if schema.device_type == DeviceType.ACTIVE:
        model.credentials = schema.credentials
        model.ip_address = schema.ip_address
    
    return model

def device_model_to_show_schema(model: NetworkDevice) -> device_schema.ShowNetworkDevice | device_schema.ShowActiveNetworkDevice:
    if model.device_type == DeviceType.ACTIVE:
        return device_schema.ShowActiveNetworkDevice(_id=str(model.id), **model.model_dump())

    return device_schema.ShowNetworkDevice(
        _id= str(model.id),
        **model.model_dump()
    )