import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    logoTitle: { control: 'text' },
    headerContent: { control: false },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    logoTitle: 'FinanceApp',
    headerContent: <span style={{ color: '#6b7280', fontSize: 14 }}>Меню</span>,
    children: 'Контент страницы',
  },
};
