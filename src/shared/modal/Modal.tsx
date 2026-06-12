import React, { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

export interface ModalProps {
  visible: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export function Modal({ visible, children, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible || !mounted) {
    return null;
  }

  const handleMaskClick = () => {
    onClose?.();
  };

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true">
      <button
        type="button"
        className="modal__mask"
        aria-label="Закрыть"
        onClick={handleMaskClick}
        disabled={!onClose}
      />
      <div className="modal__window">
        <button
          type="button"
          className="modal__close"
          aria-label="Закрыть"
          onClick={onClose}
          disabled={!onClose}
        >
          ×
        </button>
        <div className="modal__content">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
