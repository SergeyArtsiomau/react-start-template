import type { FormProps } from 'src/features/forms/types';

export type OperationFormValues = {
  name: string;
  amount: string;
  categoryName: string;
  description: string;
};

export const EMPTY_OPERATION_FORM_VALUES: OperationFormValues = {
  name: '',
  amount: '',
  categoryName: '',
  description: '',
};

export type OperationFormErrors = Partial<Record<keyof OperationFormValues, string>>;

export type OperationFormProps = FormProps<OperationFormValues>;
