import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileFormPanel } from './ProfileFormPanel';

type ProfileFormStoryArgs = {
  disabled: boolean;
  name: string;
  about: string;
};

const meta: Meta<ProfileFormStoryArgs> = {
  title: 'Forms/ProfileForm',
  component: ProfileFormPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Форма профиля. При отправке данные выводятся в консоль, форма очищается.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    name: { control: 'text', description: 'Начальное значение поля «Имя»' },
    about: { control: 'text', description: 'Начальное значение поля «О себе»' },
  },
  render: ({ disabled, name, about }) => <ProfileFormPanel disabled={disabled} initialValues={{ name, about }} />,
};

export default meta;

type Story = StoryObj<ProfileFormStoryArgs>;

export const Default: Story = {
  args: {
    disabled: false,
    name: 'Иван',
    about: 'Люблю React и TypeScript',
  },
};

export const Empty: Story = {
  args: {
    disabled: false,
    name: '',
    about: '',
  },
};
