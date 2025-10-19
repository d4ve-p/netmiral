import { ActiveDevice, Device } from "@/types/device";
import ModalType from "@/types/modal-type";

export function triggerModal(
  callback: (arg: ModalType) => void, 
  modalType: ModalType
) {
  return () => callback(modalType);
}

export function isActiveDevice(device: Device): device is ActiveDevice {
  return 'ip_address' in device;
}