import type { OperationFormValues } from 'src/features/forms/OperationForm';

export type Operation = OperationFormValues & {
  id: string;
  date: string;
};
