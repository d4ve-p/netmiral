import ModalType from "@/types/modal-type";

export function triggerModal(
  callback: (arg: ModalType) => void, 
  modalType: ModalType
) {
  return () => callback(modalType);
}