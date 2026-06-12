import React, { useCallback, useMemo, useState } from 'react';
import { createRandomOperation, type Operation } from '../../ts1/3_write';
import { OperationStatsView, type OperationStatsData } from './OperationStatsView';

const createBatch = (): Operation[] =>
  Array.from({ length: 8 }, () => createRandomOperation(new Date().toISOString()));

const calculateStats = (operations: Operation[]): OperationStatsData => {
  const income = operations.filter((item) => item.type === 'Profit').reduce((sum, item) => sum + item.amount, 0);
  const expense = operations.filter((item) => item.type === 'Cost').reduce((sum, item) => sum + item.amount, 0);

  return {
    total: operations.length,
    income,
    expense,
    balance: income - expense,
  };
};

export function OperationStatsContainer() {
  const [operations, setOperations] = useState<Operation[]>(createBatch);
  const stats = useMemo(() => calculateStats(operations), [operations]);

  const handleRefresh = useCallback(() => {
    setOperations(createBatch());
  }, []);

  return <OperationStatsView stats={stats} onRefresh={handleRefresh} />;
}
