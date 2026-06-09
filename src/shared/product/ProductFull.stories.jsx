import { ProductFull } from './ProductFull';

export default {
  title: 'Shop/ProductFull',
  component: ProductFull,
  tags: ['autodocs'],
  argTypes: {
    price: { control: 'text' },
    image: { control: 'text' },
    categoryName: { control: 'text' },
    name: { control: 'text' },
    description: { control: 'text' },
    count: { control: { type: 'number', min: 0, max: 99 } },
  },
};

export const Default = {
  args: {
    price: '12 990 ₽',
    image: 'https://picsum.photos/seed/product-full/600/500',
    categoryName: 'Электроника',
    name: 'Умные часы Pro',
    description:
      'Стильные умные часы с мониторингом здоровья, GPS и поддержкой уведомлений со смартфона. Подходят для спорта и повседневного использования.',
    count: 0,
  },
};
