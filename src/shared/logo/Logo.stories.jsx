import { Logo } from './Logo';

export default {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
  },
};

export const Default = {
  args: {
    title: 'FinanceApp',
  },
};
