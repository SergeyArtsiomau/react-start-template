import type { FormProps } from 'src/features/forms/types';

export type OperationFormValues = {
  name: string;
  amount: string;
  categoryId: string;
  description: string;
  type: 'Profit' | 'Cost';
};

export const EMPTY_OPERATION_FORM_VALUES: OperationFormValues = {
  name: '',
  amount: '',
  categoryId: '',
  description: '',
  type: 'Cost',
};

export type OperationFormErrors = Partial<Record<keyof OperationFormValues, string>>;

export type OperationFormProps = FormProps<OperationFormValues> & {
  categories?: Array<{ id: string; name: string }>;
};
