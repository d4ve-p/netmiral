import re
from typing import List

from beanie.operators import Eq
from beanie import SortDirection
from fastapi import UploadFile

from ..exceptions import http_exceptions
from ..schemas import device as device_schema
from ..models.NetworkDevice import NetworkDevice
from ..mappers import device_mapper
from ..dependencies import db_helper

async def get_device(id: str) -> device_schema.ShowActiveNetworkDevice:
    if not db_helper.validate_object_id(id):
        raise http_exceptions.InvalidIdException
        
    device = await NetworkDevice.get(id)
    
    if not device:
        raise http_exceptions.DeviceNotExistsException
    
    return device_mapper.device_model_to_show_schema(device)

async def get_all_devices() -> List[device_schema.ShowNetworkDevice]:
    devices = await NetworkDevice.all().sort([ 
        ("device_type", SortDirection.ASCENDING),
        ("hostname", SortDirection.ASCENDING) 
        ]).to_list()
    
    return [
        device_mapper.device_model_to_show_schema(device) 
        for device in devices 
    ]
    
async def get_search_device(name_query: str) -> List[device_schema.ShowNetworkDevice]:
    search_regex = re.compile(name_query, re.IGNORECASE)
    
    devices = await NetworkDevice.find_many(
        {"hostname": search_regex}
    ).to_list()
    
    return [
        device_mapper.device_model_to_show_schema(device)
        for device in devices
    ]

async def create_local_device(network_device: device_schema.CreateLocalNetworkDevice, config_file: UploadFile) -> device_schema.ShowNetworkDevice:
    device = await NetworkDevice.find_one(
        Eq(NetworkDevice.hostname, network_device.hostname)
    )

    if(device):
        raise http_exceptions.DeviceAlreadyExistsException

    config_text = await config_file.read()
    config_text = config_text.decode('utf-8')

    new_device = device_mapper.device_create_schema_to_model(network_device)
    new_device.config_text = config_text

    await new_device.insert()

    return device_mapper.device_model_to_show_schema(new_device)

async def create_active_device(network_device: device_schema.CreateActiveNetworkDevice) -> device_schema.ShowNetworkDevice:
    device = await NetworkDevice.find_one(
        Eq(NetworkDevice.hostname, network_device.hostname)
    )

    if(device):
        raise http_exceptions.DeviceAlreadyExistsException()

    new_device = device_mapper.device_create_schema_to_model(network_device)

    await new_device.insert()

    return device_mapper.device_model_to_show_schema(new_device)

async def delete_device(id: str):
    if not db_helper.validate_object_id(id):
        raise http_exceptions.InvalidIdException()

    device = await NetworkDevice.get(id)

    if not device:
        raise http_exceptions.DeviceNotExistsException()
    
    await device.delete()

    return device_mapper.device_model_to_show_schema(device)

async def update_local_device(schema: device_schema.UpdateLocalNetworkDevice) -> device_schema.ShowNetworkDevice:
    if not db_helper.validate_object_id(schema.id):
        raise http_exceptions.InvalidIdException
    
    device = await NetworkDevice.get(schema.id)
    if not device:
        raise http_exceptions.DeviceNotExistsException
    
    update_data = schema.model_dump(exclude={"id"}, exclude_unset=True)

    await device.set(update_data)

    await device.save()

    return device_mapper.device_model_to_show_schema(device)

async def update_active_device(schema: device_schema.UpdateActiveNetworkDevice) -> device_schema.ShowNetworkDevice:
    if not db_helper.validate_object_id(schema.id):
        raise http_exceptions.InvalidIdException
    
    device = await NetworkDevice.get(schema.id)
    if not device:
        raise http_exceptions.DeviceNotExistsException

    update_data = schema.model_dump(exclude={"id"}, exclude_unset=True)

    await device.set(update_data)

    await device.save()

    return device_mapper.device_model_to_show_schema(device)