import { OperationFull } from './OperationFull';

export default {
  title: 'Finance/OperationFull',
  component: OperationFull,
  tags: ['autodocs'],
  argTypes: {
    amount: { control: 'text' },
    categoryName: { control: 'text' },
    name: { control: 'text' },
    description: { control: 'text' },
    date: { control: 'text' },
  },
};

export const Default = {
  args: {
    amount: '+ 85 000 ₽',
    categoryName: 'Доход',
    name: 'Зарплата',
    description: 'Ежемесячная заработная плата за май 2024 года',
    date: '05.06.2024, 10:30',
  },
};
