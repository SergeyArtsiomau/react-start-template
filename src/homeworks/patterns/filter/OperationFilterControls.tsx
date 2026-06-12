import React from 'react';
import { useOperationFilter } from './OperationFilterContext';
import './filter.css';

export function OperationFilterControls() {
  const { filter, setFilter } = useOperationFilter();

  return (
    <div className="operation-filter__controls">
      <button
        type="button"
        className={`operation-filter__button${filter === 'all' ? ' operation-filter__button--active' : ''}`}
        onClick={() => setFilter('all')}
      >
        Все
      </button>
      <button
        type="button"
        className={`operation-filter__button${filter === 'Cost' ? ' operation-filter__button--active' : ''}`}
        onClick={() => setFilter('Cost')}
      >
        Расходы
      </button>
      <button
        type="button"
        className={`operation-filter__button${filter === 'Profit' ? ' operation-filter__button--active' : ''}`}
        onClick={() => setFilter('Profit')}
      >
        Доходы
      </button>
    </div>
  );
}
