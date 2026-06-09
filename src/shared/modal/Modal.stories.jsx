import { Modal } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    visible: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export const Default = {
  args: {
    visible: true,
    children: 'Содержимое модального окна',
  },
};

export const Hidden = {
  args: {
    visible: false,
    children: 'Это окно скрыто',
  },
};
