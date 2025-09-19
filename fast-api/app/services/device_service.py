from ..exceptions import http_exceptions
from ..schemas import device as device_schema
from ..models.NetworkDevice import NetworkDevice
from ..mappers import device_mapper

from beanie.operators import Eq
from fastapi import UploadFile


async def create_local_device(network_device: device_schema.CreateLocalNetworkDevice, config_file: UploadFile) -> device_schema.ShowNetworkDevice:
    device = await NetworkDevice.find_one(
        Eq(NetworkDevice.hostname, network_device.hostname)
    )

    if(device):
        raise http_exceptions.DeviceAlreadyExistsException

    config_text = await config_file.read()

    new_device = device_mapper.device_create_schema_to_model(network_device)
    new_device.config_text = config_text

    await new_device.insert()

    return device_mapper.device_model_to_show_schema(new_device)

async def create_active_device(network_device: device_schema.CreateActiveNetworkDevice):
    device = await NetworkDevice.find_one(
        Eq(NetworkDevice.hostname, network_device.hostname)
    )

    if(device):
        raise http_exceptions.DeviceAlreadyExistsException

    new_device = device_mapper.device_create_schema_to_model(network_device)

    await new_device.insert()

    return device_mapper.device_model_to_show_schema(new_device)