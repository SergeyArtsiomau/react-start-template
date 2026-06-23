export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Беспроводные наушники',
    price: '2 490 ₽',
    image: 'https://picsum.photos/seed/product-1/400/300',
    description: 'Компактные наушники с шумоподавлением и длительным временем работы от аккумулятора',
  },
  {
    id: '2',
    name: 'Умные часы',
    price: '8 990 ₽',
    image: 'https://picsum.photos/seed/product-2/400/300',
    description: 'Отслеживание активности, пульсометр и уведомления со смартфона',
  },
  {
    id: '3',
    name: 'Портативная колонка',
    price: '4 590 ₽',
    image: 'https://picsum.photos/seed/product-3/400/300',
    description: 'Влагозащищённая Bluetooth-колонка с насыщенным звуком',
  },
];
