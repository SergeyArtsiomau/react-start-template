import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { ModalWithInput } from './ModalWithInput';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    visible: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    visible: true,
    children: 'Содержимое модального окна (рендер через portal в document.body)',
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
    children: 'Это окно скрыто',
  },
};

function InteractiveModal() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setVisible(true)}>
        Открыть модальное окно
      </button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        Модальное окно смонтировано в body через React Portal
      </Modal>
    </div>
  );
}

export const WithPortal: Story = {
  render: () => <InteractiveModal />,
};

export const WithInput: Story = {
  render: () => <ModalWithInput />,
};
