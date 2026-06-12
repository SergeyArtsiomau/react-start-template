import React, { useMemo, useState } from 'react';
import { createRandomOperation, type Operation } from '../../ts1/3_write';
import './operation-stats.css';

const createBatch = (): Operation[] =>
  Array.from({ length: 8 }, () => createRandomOperation(new Date().toISOString()));

/**
 * До рефакторинга: логика и UI в одном компоненте.
 */
export function OperationStatsBefore() {
  const [operations, setOperations] = useState<Operation[]>(createBatch);

  const stats = useMemo(() => {
    const income = operations.filter((item) => item.type === 'Profit').reduce((sum, item) => sum + item.amount, 0);
    const expense = operations.filter((item) => item.type === 'Cost').reduce((sum, item) => sum + item.amount, 0);

    return {
      total: operations.length,
      income,
      expense,
      balance: income - expense,
    };
  }, [operations]);

  return (
    <div className="operation-stats-before">
      <button type="button" className="operation-stats-before__button" onClick={() => setOperations(createBatch())}>
        Обновить данные
      </button>
      <div className="operation-stats">
        <div className="operation-stats__card">
          <p className="operation-stats__label">Операций</p>
          <p className="operation-stats__value">{stats.total}</p>
        </div>
        <div className="operation-stats__card">
          <p className="operation-stats__label">Доход</p>
          <p className="operation-stats__value">+{stats.income.toLocaleString('ru-RU')} ₽</p>
        </div>
        <div className="operation-stats__card">
          <p className="operation-stats__label">Расход</p>
          <p className="operation-stats__value">−{stats.expense.toLocaleString('ru-RU')} ₽</p>
        </div>
      </div>
      <p style={{ marginTop: 12, color: '#6b7280' }}>Баланс: {stats.balance.toLocaleString('ru-RU')} ₽</p>
    </div>
  );
}
