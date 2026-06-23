import type { ProductFormValues } from './types';

export const validateProductForm = (values: ProductFormValues): Partial<Record<keyof ProductFormValues, string>> => {
  const errors: Partial<Record<keyof ProductFormValues, string>> = {};

  if (!values.name.trim()) {
    errors.name = 'Введите название';
  }

  if (!values.price.trim()) {
    errors.price = 'Введите цену';
  }

  if (!values.categoryId) {
    errors.categoryId = 'Выберите категорию';
  }

  return errors;
};
