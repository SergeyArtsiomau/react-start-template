import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OperationListMemo } from './OperationListMemo';
import { OperationListMemoBefore } from './OperationListMemoBefore';

const meta: Meta = {
  title: 'Homework/Patterns/6 Memoization',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Before: Story = {
  render: () => <OperationListMemoBefore />,
};

export const After: Story = {
  render: () => <OperationListMemo />,
};
