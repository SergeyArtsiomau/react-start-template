import type { Meta, StoryObj } from '@storybook/react';
import { PatternsDemo } from './PatternsDemo';

const meta: Meta<typeof PatternsDemo> = {
  title: 'Homework/Patterns/Overview',
  component: PatternsDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof PatternsDemo>;

export const AllPatterns: Story = {};
