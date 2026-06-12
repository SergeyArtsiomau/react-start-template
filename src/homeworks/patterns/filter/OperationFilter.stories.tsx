import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OperationFilter } from './OperationFilter';
import { OperationFilterBefore } from './OperationFilterBefore';

const meta: Meta = {
  title: 'Homework/Patterns/5 Provider Context',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Before: Story = {
  render: () => <OperationFilterBefore />,
};

export const After: Story = {
  render: () => (
    <OperationFilter>
      <OperationFilter.Controls />
      <OperationFilter.List />
    </OperationFilter>
  ),
};
