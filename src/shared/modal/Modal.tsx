import React, { type ReactNode, useEffect } from 'react';
import './modal.css';

export interface ModalProps {
  visible?: boolean;
  children?: ReactNode;
  onClose?: () => void;
}

export function Modal({ visible = false, children, onClose }: ModalProps) {
  useEffect(() => {
    if (!visible || !onClose) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__mask" onClick={onClose} role="presentation" />
      <div className="modal__window" onClick={(event) => event.stopPropagation()} role="document">
        <button type="button" className="modal__close" aria-label="Закрыть" onClick={onClose} disabled={!onClose}>
          ×
        </button>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
}
