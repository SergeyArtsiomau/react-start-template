import React, { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { createRandomOperation, type Operation } from '../../ts1/3_write';

export type OperationFilterType = 'all' | 'Cost' | 'Profit';

interface OperationFilterContextValue {
  operations: Operation[];
  filter: OperationFilterType;
  filteredOperations: Operation[];
  setFilter: (filter: OperationFilterType) => void;
}

const OperationFilterContext = createContext<OperationFilterContextValue | null>(null);

const INITIAL_OPERATIONS = Array.from({ length: 6 }, () => createRandomOperation(new Date().toISOString()));

interface OperationFilterProviderProps {
  children: ReactNode;
}

export function OperationFilterProvider({ children }: OperationFilterProviderProps) {
  const [operations] = useState<Operation[]>(INITIAL_OPERATIONS);
  const [filter, setFilter] = useState<OperationFilterType>('all');

  const filteredOperations = useMemo(() => {
    if (filter === 'all') {
      return operations;
    }

    return operations.filter((operation) => operation.type === filter);
  }, [filter, operations]);

  const value = useMemo(
    () => ({
      operations,
      filter,
      filteredOperations,
      setFilter,
    }),
    [operations, filter, filteredOperations],
  );

  return <OperationFilterContext.Provider value={value}>{children}</OperationFilterContext.Provider>;
}

export function useOperationFilter(): OperationFilterContextValue {
  const context = useContext(OperationFilterContext);

  if (!context) {
    throw new Error('useOperationFilter должен использоваться внутри OperationFilterProvider');
  }

  return context;
}
