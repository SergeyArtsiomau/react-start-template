import React, { useState } from 'react';
import { createRandomOperation, type Operation } from '../../ts1/3_write';
import { OperationListItemBefore } from './OperationListItemBefore';
import './memoization.css';

const createInitialOperations = (): Operation[] =>
  Array.from({ length: 5 }, () => createRandomOperation('2026-01-01T00:00:00.000Z'));

/**
 * До рефакторинга: при каждом обновлении родителя пересоздаются колбэки
 * и пересчитывается список, из-за чего все дочерние элементы перерисовываются.
 */
export function OperationListMemoBefore() {
  const [operations] = useState<Operation[]>(createInitialOperations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const sortedOperations = [...operations].sort((left, right) => left.name.localeCompare(right.name));

  return (
    <div className="memo-list">
      <div className="memo-list__toolbar">
        <button type="button" className="memo-list__tick-button" onClick={() => setTick((value) => value + 1)}>
          Перерисовать родителя ({tick})
        </button>
        <p className="memo-list__hint">Счётчик перерисовок у всех элементов растёт вместе с родителем.</p>
      </div>
      <ul className="memo-list__items">
        {sortedOperations.map((operation) => (
          <OperationListItemBefore
            key={operation.id}
            operation={operation}
            selected={selectedId === operation.id}
            onSelect={(id) => setSelectedId(id)}
          />
        ))}
      </ul>
    </div>
  );
}
