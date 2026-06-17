import type { Operation } from './types';

export const MOCK_OPERATIONS: Operation[] = [
  {
    id: '1',
    name: 'Покупка в супермаркете',
    amount: '-1250',
    categoryName: 'Продукты',
    description: 'Еженедельная закупка продуктов для семьи, включая овощи, фрукты и бытовую химию',
    date: '10.06.2026',
  },
  {
    id: '2',
    name: 'Зарплата',
    amount: '85000',
    categoryName: 'Доход',
    description: 'Ежемесячное поступление на расчётный счёт',
    date: '05.06.2026',
  },
  {
    id: '3',
    name: 'Оплата интернета',
    amount: '-890',
    categoryName: 'Коммунальные услуги',
    description: 'Абонентская плата за домашний интернет',
    date: '01.06.2026',
  },
];
