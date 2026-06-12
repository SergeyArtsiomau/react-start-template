import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Timer } from './Timer';
import { TimerBefore } from './TimerBefore';

const meta: Meta = {
  title: 'Homework/Patterns/2 Custom Hook',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Before: Story = {
  render: () => <TimerBefore />,
};

export const After: Story = {
  render: () => <Timer />,
};
