import type { FormProps } from 'src/features/forms/types';

export type OperationFormValues = {
  name: string;
  amount: string;
  categoryName: string;
  description: string;
};

export type OperationFormErrors = Partial<Record<keyof OperationFormValues, string>>;

export type OperationFormProps = FormProps<OperationFormValues>;
