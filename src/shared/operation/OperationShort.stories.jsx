import { OperationShort } from './OperationShort';

export default {
  title: 'Finance/OperationShort',
  component: OperationShort,
  tags: ['autodocs'],
  argTypes: {
    amount: { control: 'text' },
    categoryName: { control: 'text' },
    name: { control: 'text' },
    description: { control: 'text' },
  },
};

export const Default = {
  args: {
    amount: '− 1 250 ₽',
    categoryName: 'Продукты',
    name: 'Покупка в супермаркете',
    description: 'Еженедельная закупка продуктов для семьи, включая овощи, фрукты и бытовую химию',
  },
};
