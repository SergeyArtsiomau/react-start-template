import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AuthFormPanel } from './AuthFormPanel';
import type { AuthMode } from './AuthFormPanel';

type AuthFormStoryArgs = {
  disabled: boolean;
  mode: AuthMode;
};

const meta: Meta<AuthFormStoryArgs> = {
  title: 'Forms/AuthForm',
  component: AuthFormPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Форма входа и регистрации. Валидация email и пароля. При отправке данные выводятся в консоль, форма очищается.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    mode: {
      control: 'radio',
      options: ['signIn', 'signUp'],
      description: 'Режим: вход или регистрация',
    },
  },
  render: ({ disabled, mode }) => <AuthFormPanel disabled={disabled} mode={mode} />,
};

export default meta;

type Story = StoryObj<AuthFormStoryArgs>;

export const SignIn: Story = {
  args: {
    mode: 'signIn',
    disabled: false,
  },
};

export const SignUp: Story = {
  args: {
    mode: 'signUp',
    disabled: false,
  },
};
