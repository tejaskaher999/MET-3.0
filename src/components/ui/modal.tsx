import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-lg shadow-xl">
                {children}
            </div>
        </div>
    );
}; 