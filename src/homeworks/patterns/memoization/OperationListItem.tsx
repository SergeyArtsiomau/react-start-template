import React, { memo } from 'react';
import type { Operation } from '../../ts1/3_write';
import { useRenderCount } from './useRenderCount';
import './memoization.css';

interface OperationListItemProps {
  operation: Operation;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const OperationListItem = memo(function OperationListItem({
  operation,
  selected,
  onSelect,
}: OperationListItemProps) {
  const renderCount = useRenderCount();

  return (
    <li className={`memo-list__item${selected ? ' memo-list__item--selected' : ''}`}>
      <button type="button" className="memo-list__button" onClick={() => onSelect(operation.id)}>
        <span className="memo-list__name">{operation.name}</span>
        <span className="memo-list__meta">
          {operation.type === 'Cost' ? 'Расход' : 'Доход'} · {operation.amount.toLocaleString('ru-RU')} ₽
        </span>
      </button>
      <span className="memo-list__renders">Перерисовок: {renderCount}</span>
    </li>
  );
});
