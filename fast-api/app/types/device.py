from enum import Enum

class DeviceType(str, Enum):
    ACTIVE = 'active'
    LOCAL = 'local'

class DeviceStatus(str, Enum):
    ONLINE = 'online'
    OFFLINE = 'offline'
    UNKNOWN = 'unknown'