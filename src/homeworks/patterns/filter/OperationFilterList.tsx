import React from 'react';
import { useOperationFilter } from './OperationFilterContext';
import './filter.css';

export function OperationFilterList() {
  const { filteredOperations } = useOperationFilter();

  return (
    <ul className="operation-filter__list">
      {filteredOperations.map((operation) => (
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
