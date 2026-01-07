import AddActiveDeviceModal from "@/components/modals/add-active-device-modal";
import UploadConfigModal from "@/components/modals/upload-config-modal";
import VlanModal from "@/components/modals/vlan-modal";
import ModalType from "@/types/modal-type";
import AddAclModal from "@/components/modals/add-acl-modal";
import AddAclRuleModal from "@/components/modals/add-acl-rule-modal";
import UpsertInterfaceModal from "@/components/modals/upsert-interface-modal";
import UpsertRouteModal from "@/components/modals/upsert-route-modal";

export const ModalMap = {
    [ModalType.ActiveDevice]: AddActiveDeviceModal,
    [ModalType.LocalDevice]: UploadConfigModal,
    [ModalType.AddEditStaticRotue]: AddActiveDeviceModal,
    [ModalType.AddEditVlan]: VlanModal,
    [ModalType.AddAcl]: AddAclModal,
    [ModalType.AddAclRule]: AddAclRuleModal,
    [ModalType.UpsertInterface]: UpsertInterfaceModal,
    [ModalType.UpsertRoute]: UpsertRouteModal
}