import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

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
    children: 'Содержимое модального окна',
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
    children: 'Это окно скрыто',
  },
};
