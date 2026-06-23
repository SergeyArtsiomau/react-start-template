import type { OperationFormValues } from 'src/features/forms/OperationForm';
import type { ProductFormValues } from 'src/features/forms/ProductForm';
import type { ServerCategory, ServerOperation, ServerProduct } from './types';

export const formatPrice = (price: number): string => `${price.toLocaleString('ru-RU')} ₽`;

export const parsePrice = (value: string): number =>
  Number(value.replace(/\s/g, '').replace('₽', '').replace(',', '.'));

export const mapServerOperationToListItem = (operation: ServerOperation) => ({
  id: operation.id,
  name: operation.name,
  amount: operation.amount,
  categoryName: operation.category?.name ?? '—',
  description: operation.desc ?? '',
  date: new Date(operation.date ?? operation.createdAt).toLocaleDateString('ru-RU'),
  type: operation.type,
  categoryId: operation.category?.id ?? '',
});

export const mapServerProductToListItem = (product: ServerProduct) => ({
  id: product.id,
  name: product.name,
  price: formatPrice(product.price),
  image: product.photo ?? 'https://picsum.photos/seed/product/400/300',
  description: product.desc ?? '',
  categoryId: product.category?.id ?? '',
  rawPrice: product.price,
});

export const mapOperationFormToCreateBody = (values: OperationFormValues, categoryId: string) => ({
  name: values.name,
  desc: values.description || undefined,
  amount: parsePrice(values.amount),
  date: new Date().toISOString(),
  type: values.type,
  categoryId,
});

export const mapOperationFormToUpdateBody = (values: OperationFormValues, categoryId: string) => ({
  name: values.name,
  desc: values.description || undefined,
  amount: parsePrice(values.amount),
  date: new Date().toISOString(),
  type: values.type,
  categoryId,
});

export const mapServerOperationToFormValues = (operation: ServerOperation): OperationFormValues => ({
  name: operation.name,
  amount: String(operation.amount),
  categoryId: operation.category?.id ?? '',
  description: operation.desc ?? '',
  type: operation.type,
});

export const mapProductFormToBody = (values: ProductFormValues, categoryId: string) => ({
  name: values.name,
  desc: values.description || undefined,
  price: parsePrice(values.price),
  photo: values.image || undefined,
  categoryId,
});

export const mapServerProductToFormValues = (product: ServerProduct): ProductFormValues => ({
  name: product.name,
  price: String(product.price),
  description: product.desc ?? '',
  image: product.photo ?? '',
  categoryId: product.category?.id ?? '',
});

export const getCategoryId = (values: { categoryId: string }, categories: ServerCategory[]): string => {
  if (values.categoryId) {
    return values.categoryId;
  }

  return categories[0]?.id ?? '';
};
