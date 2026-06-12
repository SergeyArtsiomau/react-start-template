import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OperationFormPanel } from './OperationFormPanel';

type OperationFormStoryArgs = {
  disabled: boolean;
  title: string;
  submitLabel: string;
  name: string;
  amount: string;
  categoryName: string;
  description: string;
};

const meta: Meta<OperationFormStoryArgs> = {
  title: 'Forms/OperationForm',
  component: OperationFormPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Форма добавления/редактирования операции. При отправке данные выводятся в консоль, форма очищается.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    title: { control: 'text' },
    submitLabel: { control: 'text' },
    name: { control: 'text' },
    amount: { control: 'text' },
    categoryName: { control: 'text' },
    description: { control: 'text' },
  },
  render: ({ disabled, title, submitLabel, name, amount, categoryName, description }) => (
    <OperationFormPanel
      disabled={disabled}
      title={title}
      submitLabel={submitLabel}
      initialValues={{ name, amount, categoryName, description }}
    />
  ),
};

export default meta;

type Story = StoryObj<OperationFormStoryArgs>;

export const Create: Story = {
  args: {
    title: 'Новая операция',
    submitLabel: 'Добавить операцию',
    disabled: false,
    name: '',
    amount: '',
    categoryName: '',
    description: '',
  },
};

export const Edit: Story = {
  args: {
    title: 'Редактирование операции',
    submitLabel: 'Сохранить изменения',
    disabled: false,
    name: 'Покупка в супермаркете',
    amount: '1250',
    categoryName: 'Продукты',
    description: 'Еженедельная закупка',
  },
};
