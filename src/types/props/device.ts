import { Device } from "../device";

export interface DeviceListItemProps {
    device: Device;
    isSelected: boolean;
    onClick: () => void;
}

export interface DeviceListProps {
  selectedDeviceId: string | null;
  onSelectDevice: (deviceId: string) => void;
}