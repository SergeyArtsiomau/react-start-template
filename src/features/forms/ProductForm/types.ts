import type { FormProps } from 'src/features/forms/types';

export type ProductFormValues = {
  name: string;
  price: string;
  description: string;
  image: string;
  categoryId: string;
};

export const EMPTY_PRODUCT_FORM_VALUES: ProductFormValues = {
  name: '',
  price: '',
  description: '',
  image: '',
  categoryId: '',
};

export type ProductFormErrors = Partial<Record<keyof ProductFormValues, string>>;

export type ProductFormProps = FormProps<ProductFormValues> & {
  categories?: Array<{ id: string; name: string }>;
};
