"use client";

import ModalType from '@/types/modal-type';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalProps = Record<string, any>;

interface ModalContextType {
  isOpen: boolean;
  modalType: string | null;
  modalProps: ModalProps;
  openModal: (modalType: ModalType, modalProps?: ModalProps) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<string | null>(null);
    const [modalProps, setModalProps] = useState<ModalProps>({});

    const openModal = (type: string, props: ModalProps = {}) => {
        setModalType(type);
        setModalProps(props);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => {
        setModalType(null);
        setModalProps({});
        }, 300);
    };

    return (
        <ModalContext.Provider value={{ isOpen, modalType, modalProps, openModal, closeModal }}>
        {children}
        {/* TODO: Add ModalManager */}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};