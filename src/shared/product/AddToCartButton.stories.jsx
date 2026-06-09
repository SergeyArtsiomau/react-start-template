import { AddToCartButton } from './AddToCartButton';

export default {
  title: 'Shop/AddToCartButton',
  component: AddToCartButton,
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 0, max: 99 } },
    disabled: { control: 'boolean' },
  },
};

export const Empty = {
  args: {
    count: 0,
    disabled: false,
  },
};

export const WithCount = {
  args: {
    count: 3,
    disabled: false,
  },
};
