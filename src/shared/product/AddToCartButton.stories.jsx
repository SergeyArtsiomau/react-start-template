import { AddToCartButton } from './AddToCartButton';

export default {
  title: 'Shop/AddToCartButton',
  component: AddToCartButton,
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 0, max: 99 } },
  },
};

export const Empty = {
  args: {
    count: 0,
  },
};

export const WithCount = {
  args: {
    count: 3,
  },
};
