import { useAppDispatch, useAppSelector } from 'src/app/store';
import { addOperation, selectAllOperations, selectOperationById, updateOperation } from './model/operationsSlice';
import type { OperationFormValues } from 'src/features/forms/OperationForm';

export function useOperations() {
  const dispatch = useAppDispatch();
  const operations = useAppSelector(selectAllOperations);

  return {
    operations,
    getOperation: (id: string) => operations.find((operation) => operation.id === id),
    addOperation: (values: OperationFormValues) => dispatch(addOperation(values)),
    updateOperation: (id: string, values: OperationFormValues) => dispatch(updateOperation({ id, values })),
  };
}

export { selectOperationById };
