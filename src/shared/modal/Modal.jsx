import React from 'react';
import './modal.css';

export function Modal({ visible = false, children }) {
  if (!visible) {
    return null;
  }

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__mask" />
      <div className="modal__window">
        <button type="button" className="modal__close" aria-label="Закрыть" disabled>
          ×
        </button>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
}
