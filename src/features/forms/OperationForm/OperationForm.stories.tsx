import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OperationFormPanel } from './OperationFormPanel';

type OperationFormStoryArgs = {
  disabled: boolean;
  title: string;
  submitLabel: string;
  name: string;
  amount: string;
  categoryId: string;
  description: string;
  type: 'Profit' | 'Cost';
};

const meta: Meta<OperationFormStoryArgs> = {
  title: 'Forms/OperationForm',
  component: OperationFormPanel,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    title: { control: 'text' },
    submitLabel: { control: 'text' },
    name: { control: 'text' },
    amount: { control: 'text' },
    categoryId: { control: 'text' },
    description: { control: 'text' },
    type: { control: 'select', options: ['Profit', 'Cost'] },
  },
  render: ({ disabled, title, submitLabel, name, amount, categoryId, description, type }) => (
    <OperationFormPanel
      disabled={disabled}
      title={title}
      submitLabel={submitLabel}
      categories={[
        { id: '1', name: 'Продукты' },
        { id: '2', name: 'Доход' },
      ]}
      initialValues={{ name, amount, categoryId, description, type }}
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
    categoryId: '1',
    description: '',
    type: 'Cost',
  },
};

export const Edit: Story = {
  args: {
    title: 'Редактирование операции',
    submitLabel: 'Сохранить изменения',
    disabled: false,
    name: 'Покупка в супермаркете',
    amount: '1250',
    categoryId: '1',
    description: 'Еженедельная закупка',
    type: 'Cost',
  },
};
