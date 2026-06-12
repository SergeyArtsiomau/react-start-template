/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

export type Category = {
  id: string;
  name: string;
  photo?: string;
};

export type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};

export type Cost = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost';
};

export type Profit = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Profit';
};

export type Operation = Cost | Profit;

const randomId = (): string => Math.random().toString(36).substring(2, 11);

const randomFrom = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

const categoryNames = ['Продукты', 'Транспорт', 'Развлечения', 'Здоровье', 'Одежда', 'Жильё'];

const productNames = ['Хлеб', 'Молоко', 'Телефон', 'Книга', 'Кроссовки', 'Наушники', 'Кофе', 'Ноутбук'];

const operationNames = ['Покупка продуктов', 'Зарплата', 'Такси', 'Фриланс', 'Аренда', 'Кэшбэк'];

const createRandomCategory = (): Category => ({
  id: randomId(),
  name: randomFrom(categoryNames),
  ...(Math.random() > 0.5 ? { photo: `https://example.com/categories/${randomId()}.jpg` } : {}),
});

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string): Product => {
  const price = Math.round(Math.random() * 10000) / 100;
  const hasOldPrice = Math.random() > 0.5;

  return {
    id: randomId(),
    name: randomFrom(productNames),
    photo: `https://picsum.photos/seed/${randomId()}/400/300`,
    desc: Math.random() > 0.5 ? `Описание товара ${randomId()}` : undefined,
    createdAt,
    oldPrice: hasOldPrice ? Math.round((price + Math.random() * 500) * 100) / 100 : undefined,
    price,
    category: createRandomCategory(),
  };
};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  const isCost = Math.random() > 0.5;
  const base = {
    id: randomId(),
    name: randomFrom(operationNames),
    desc: Math.random() > 0.5 ? `Описание операции ${randomId()}` : undefined,
    createdAt,
    amount: Math.round(Math.random() * 10000) / 100,
    category: createRandomCategory(),
  };

  if (isCost) {
    return { ...base, type: 'Cost' as const };
  }

  return { ...base, type: 'Profit' as const };
};
