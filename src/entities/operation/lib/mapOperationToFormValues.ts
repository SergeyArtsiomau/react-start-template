import type { OperationFormValues } from 'src/features/forms/OperationForm';
import type { Operation } from '../model/types';

export const mapOperationToFormValues = (operation: Operation): OperationFormValues => ({
  name: operation.name,
  amount: operation.amount,
  categoryId: '',
  description: operation.description,
  type: 'Cost',
});
