import type { Meta, StoryObj } from '@storybook/react';
import { OperationShort } from './OperationShort';

const meta: Meta<typeof OperationShort> = {
  title: 'Finance/OperationShort',
  component: OperationShort,
  tags: ['autodocs'],
  argTypes: {
    amount: { control: 'text' },
    categoryName: { control: 'text' },
    name: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof OperationShort>;

export const Default: Story = {
  args: {
    amount: '− 1 250 ₽',
    categoryName: 'Продукты',
    name: 'Покупка в супермаркете',
    description: 'Еженедельная закупка продуктов для семьи, включая овощи, фрукты и бытовую химию',
  },
};
