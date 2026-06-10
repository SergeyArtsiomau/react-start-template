import type { Meta, StoryObj } from '@storybook/react';
import { OperationFull } from './OperationFull';

const meta: Meta<typeof OperationFull> = {
  title: 'Finance/OperationFull',
  component: OperationFull,
  tags: ['autodocs'],
  argTypes: {
    amount: { control: 'text' },
    categoryName: { control: 'text' },
    name: { control: 'text' },
    description: { control: 'text' },
    date: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof OperationFull>;

export const Default: Story = {
  args: {
    amount: '+ 85 000 ₽',
    categoryName: 'Доход',
    name: 'Зарплата',
    description: 'Ежемесячная заработная плата за май 2024 года',
    date: '05.06.2024, 10:30',
  },
};
