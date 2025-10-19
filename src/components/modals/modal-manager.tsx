"use client"
import { useModal } from "@/contexts/modal-context";
import { ModalMap } from "@/lib/ui-helper/modal-map";

export default function ModalManager() {
    const { modalType, isOpen } = useModal()

    if(!modalType || !isOpen) return null;

    const ModalComponent = ModalMap[modalType];

    return <ModalComponent />;
}