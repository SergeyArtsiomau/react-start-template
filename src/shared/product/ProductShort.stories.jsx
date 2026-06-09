import { ProductShort } from './ProductShort';

export default {
  title: 'Shop/ProductShort',
  component: ProductShort,
  tags: ['autodocs'],
  argTypes: {
    price: { control: 'text' },
    image: { control: 'text' },
    name: { control: 'text' },
    description: { control: 'text' },
    count: { control: { type: 'number', min: 0, max: 99 } },
  },
};

export const Default = {
  args: {
    price: '2 490 ₽',
    image: 'https://picsum.photos/seed/product-short/400/300',
    name: 'Беспроводные наушники',
    description: 'Компактные наушники с шумоподавлением и длительным временем работы от аккумулятора',
    count: 0,
  },
};
