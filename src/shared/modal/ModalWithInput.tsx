import React, { useState } from 'react';
import { Modal } from './Modal';
import './modal-with-input.css';

export function ModalWithInput() {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div className="modal-with-input">
      <input
        className="modal-with-input__field"
        type="text"
        value={text}
        placeholder="Введите текст для модального окна"
        onChange={(event) => setText(event.target.value)}
      />
      <button type="button" className="modal-with-input__button" onClick={handleOpen}>
        Открыть модальное окно
      </button>
      <Modal visible={visible} onClose={handleClose}>
        {text || <span className="modal-with-input__placeholder">Текст не введён</span>}
      </Modal>
    </div>
  );
}
