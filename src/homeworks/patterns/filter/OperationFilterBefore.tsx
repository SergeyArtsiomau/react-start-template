import React, { useMemo, useState } from 'react';
import { createRandomOperation, type Operation } from '../../ts1/3_write';
import './filter.css';

type FilterType = 'all' | 'Cost' | 'Profit';

const INITIAL_OPERATIONS = Array.from({ length: 6 }, () => createRandomOperation(new Date().toISOString()));

function OperationFilterControlsBefore({
  filter,
  onFilterChange,
}: {
  filter: FilterType;
  onFilterChange: (value: FilterType) => void;
}) {
  return (
    <div className="operation-filter__controls">
      <button
        type="button"
        className={`operation-filter__button${filter === 'all' ? ' operation-filter__button--active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        Все
      </button>
      <button
        type="button"
        className={`operation-filter__button${filter === 'Cost' ? ' operation-filter__button--active' : ''}`}
        onClick={() => onFilterChange('Cost')}
      >
        Расходы
      </button>
      <button
        type="button"
        className={`operation-filter__button${filter === 'Profit' ? ' operation-filter__button--active' : ''}`}
        onClick={() => onFilterChange('Profit')}
      >
        Доходы
      </button>
    </div>
  );
}

function OperationFilterListBefore({ operations, filter }: { operations: Operation[]; filter: FilterType }) {
  const filtered = useMemo(() => {
    if (filter === 'all') {
      return operations;
    }

    return operations.filter((operation) => operation.type === filter);
  }, [filter, operations]);

  return (
    <ul className="operation-filter__list">
      {filtered.map((operation) => (
        <li key={operation.id} className="operation-filter__item">
          <p className="operation-filter__name">{operation.name}</p>
          <p className="operation-filter__meta">
            {operation.type === 'Cost' ? 'Расход' : 'Доход'} · {operation.amount.toLocaleString('ru-RU')} ₽
          </p>
        </li>
      ))}
    </ul>
  );
}

/**
 * До рефакторинга: filter и operations пробрасываются через несколько уровней.
 */
export function OperationFilterBefore() {
  const [operations] = useState<Operation[]>(INITIAL_OPERATIONS);
  const [filter, setFilter] = useState<FilterType>('all');

  return (
    <div className="operation-filter">
      <OperationFilterControlsBefore filter={filter} onFilterChange={setFilter} />
      <OperationFilterListBefore operations={operations} filter={filter} />
    </div>
  );
}
