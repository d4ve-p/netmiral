import AddActiveDeviceModal from "@/components/modals/add-active-device-modal";
import UploadConfigModal from "@/components/modals/upload-config-modal";
import ModalType from "@/types/modal-type";

export const ModalMap = {
    [ModalType.ActiveDevice]: AddActiveDeviceModal,
    [ModalType.LocalDevice]: UploadConfigModal
}