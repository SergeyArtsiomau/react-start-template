import React from 'react';
import './modal.css';

export function Modal({ visible = false, children, onClose }) {
  if (!visible) {
    return null;
  }

  const handleMaskClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
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
    </div>
  );
}
