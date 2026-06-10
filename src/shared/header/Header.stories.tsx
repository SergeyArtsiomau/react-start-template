import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    logoTitle: { control: 'text' },
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    logoTitle: 'FinanceApp',
    children: <span style={{ color: '#6b7280', fontSize: 14 }}>Навигация</span>,
  },
};

export const StickyScroll: Story = {
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ height: '200vh', padding: 24, background: '#f9fafb' }}>
        <p>Прокрутите страницу — Header остаётся сверху</p>
      </div>
    </div>
  ),
  args: {
    logoTitle: 'FinanceApp',
  },
};
