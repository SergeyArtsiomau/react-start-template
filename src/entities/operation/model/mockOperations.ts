import type { Operation } from './types';

export const MOCK_OPERATIONS: Operation[] = [
  {
    id: '1',
    name: 'Покупка в супермаркете',
    amount: '1250',
    categoryId: 'mock-1',
    description: 'Еженедельная закупка продуктов для семьи, включая овощи, фрукты и бытовую химию',
    type: 'Cost',
    date: '10.06.2026',
  },
  {
    id: '2',
    name: 'Зарплата',
    amount: '85000',
    categoryId: 'mock-2',
    description: 'Ежемесячное поступление на расчётный счёт',
    type: 'Profit',
    date: '05.06.2026',
  },
  {
    id: '3',
    name: 'Оплата интернета',
    amount: '890',
    categoryId: 'mock-3',
    description: 'Абонентская плата за домашний интернет',
    type: 'Cost',
    date: '01.06.2026',
  },
];
