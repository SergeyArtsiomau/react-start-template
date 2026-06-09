import { CartItem } from './CartItem';

export default {
  title: 'Shop/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    price: { control: 'text' },
    image: { control: 'text' },
    quantity: { control: { type: 'number', min: 1, max: 99 } },
  },
};

export const Default = {
  args: {
    name: 'Кофеварка',
    price: '4 590 ₽',
    image: 'https://picsum.photos/seed/cart-item/200/200',
    quantity: 1,
  },
};
