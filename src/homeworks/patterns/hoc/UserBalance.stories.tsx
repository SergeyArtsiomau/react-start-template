import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserBalance } from './UserBalance';
import { UserBalanceBefore } from './UserBalanceBefore';

const meta: Meta = {
  title: 'Homework/Patterns/4 HOC',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Before: Story = {
  render: () => <UserBalanceBefore />,
};

export const After: Story = {
  render: () => <UserBalance />,
};
