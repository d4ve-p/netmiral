interface IDevice {
    id: string;
    name: string;
}

interface LocalDevce extends IDevice { }

interface ActiveDevice extends IDevice {
    ipAddress: string;
    model: string;
    osVersion: string;
}