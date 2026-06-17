import React, { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { OperationFormValues } from 'src/features/forms/OperationForm';
import { createOperationId } from '../lib/createOperationId';
import { MOCK_OPERATIONS } from './mockOperations';
import type { Operation } from './types';

type OperationsContextValue = {
  operations: Operation[];
  getOperation: (id: string) => Operation | undefined;
  addOperation: (values: OperationFormValues) => void;
  updateOperation: (id: string, values: OperationFormValues) => void;
};

const OperationsContext = createContext<OperationsContextValue | null>(null);

const formatOperationDate = (date: Date): string =>
  date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

const createOperation = (values: OperationFormValues): Operation => ({
  id: createOperationId(),
  name: values.name,
  amount: values.amount,
  categoryName: values.categoryName,
  description: values.description,
  date: formatOperationDate(new Date()),
});

export function OperationsProvider({ children }: { children: ReactNode }) {
  const [operations, setOperations] = useState<Operation[]>(MOCK_OPERATIONS);

  const getOperation = useCallback((id: string) => operations.find((operation) => operation.id === id), [operations]);

  const addOperation = useCallback((values: OperationFormValues) => {
    setOperations((current) => [createOperation(values), ...current]);
  }, []);

  const updateOperation = useCallback((id: string, values: OperationFormValues) => {
    setOperations((current) =>
      current.map((operation) => (operation.id === id ? { ...operation, ...values } : operation))
    );
  }, []);

  const value = useMemo(
    () => ({ operations, getOperation, addOperation, updateOperation }),
    [operations, getOperation, addOperation, updateOperation]
  );

  return <OperationsContext.Provider value={value}>{children}</OperationsContext.Provider>;
}

export function useOperations(): OperationsContextValue {
  const context = useContext(OperationsContext);

  if (!context) {
    throw new Error('useOperations должен использоваться внутри OperationsProvider');
  }

  return context;
}
