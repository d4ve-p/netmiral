from ..models import NetworkDevice
from .. import schemas

def device_create_schema_to_model(schema: schemas.CreateNetworkDevice) -> NetworkDevice:
    return NetworkDevice(
        hostname=schema.hostname,
        device_type=str(schema.device_type),
        location=schema.location,
        ip_address=schema.ip_address,
        status=str(schema.status),
        credentials=schema.credentials,
        model=schema.model,
        os_version=schema.os_version
    )

def device_model_to_show_schema(model: NetworkDevice) -> schemas.ShowNetworkDevice:
    return schemas.ShowNetworkDevice(
        hostname=model.hostname,
        device_type=model.device_type,
        location=model.location,
        ip_address=model.ip_address,
        status=model.status  ,
        model=model.model,
        os_version=model.os_version,
        
        config_text=model.config_text,
        created_at=model.created_at,
    )