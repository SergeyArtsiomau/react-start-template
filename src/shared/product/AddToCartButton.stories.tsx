import type { Meta, StoryObj } from '@storybook/react';
import { AddToCartButton } from './AddToCartButton';

const meta: Meta<typeof AddToCartButton> = {
  title: 'Shop/AddToCartButton',
  component: AddToCartButton,
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 0, max: 99 } },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof AddToCartButton>;

export const Empty: Story = {
  args: {
    count: 0,
    disabled: false,
  },
};

export const WithCount: Story = {
  args: {
    count: 3,
    disabled: false,
  },
};
