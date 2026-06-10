import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LocalizedText } from './LocalizedText';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 24,
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
          minHeight: 160,
        }}
      >
        <Story />
        <LocalizedText />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {};
