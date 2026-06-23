import React, { useCallback, useMemo, useState } from 'react';
import { createRandomOperation, type Operation } from '../../ts1/3_write';
import { OperationListItem } from './OperationListItem';
import './memoization.css';

const createInitialOperations = (): Operation[] =>
  Array.from({ length: 5 }, () => createRandomOperation('2026-01-01T00:00:00.000Z'));

/**
 * После рефакторинга: useMemo кэширует отсортированный список,
 * useCallback стабилизирует обработчик, memo пропускает лишние перерисовки детей.
 */
export function OperationListMemo() {
  const [operations] = useState<Operation[]>(createInitialOperations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const sortedOperations = useMemo(
    () => [...operations].sort((left, right) => left.name.localeCompare(right.name)),
    [operations]
  );

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return (
    <div className="memo-list">
      <div className="memo-list__toolbar">
        <button type="button" className="memo-list__tick-button" onClick={() => setTick((value) => value + 1)}>
          Перерисовать родителя ({tick})
        </button>
        <p className="memo-list__hint">
          useMemo + useCallback + memo: счётчик перерисовок растёт только у выбранного элемента.
        </p>
      </div>
      <ul className="memo-list__items">
        {sortedOperations.map((operation) => (
          <OperationListItem
            key={operation.id}
            operation={operation}
            selected={selectedId === operation.id}
            onSelect={handleSelect}
          />
        ))}
      </ul>
    </div>
  );
}
