export enum DeviceType {
    ACTIVE = 'active',
    LOCAL = 'local'
}

export enum DeviceStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    UNKNOWN = 'unknown'
}

interface IDevice {
    id: string;
    hostname: string;
    device_type: DeviceType,
    location: string | null;
    os_version: string | null;
    model: string | null;

    config_text: string;
    created_at: Date;
}

export interface LocalDevice extends IDevice { }

export interface ActiveDevice extends IDevice {
    ip_address: string;
    status: DeviceStatus;
}

export type Device = LocalDevice | ActiveDevice