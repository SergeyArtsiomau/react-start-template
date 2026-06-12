import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OperationStatsBefore } from './OperationStatsBefore';
import { OperationStatsContainer } from './OperationStatsContainer';

const meta: Meta = {
  title: 'Homework/Patterns/3 Container Presentational',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Before: Story = {
  render: () => <OperationStatsBefore />,
};

export const After: Story = {
  render: () => <OperationStatsContainer />,
};
