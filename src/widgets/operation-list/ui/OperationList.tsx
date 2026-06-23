import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OperationFull } from 'src/shared/operation/OperationFull';
import { formatOperationAmount } from 'src/entities/operation/model/formatOperationAmount';
import { useGetOperationsPageQuery } from 'src/shared/api/api';
import { mapServerOperationToListItem } from 'src/shared/api/mappers';
import { usePaginatedList } from 'src/shared/lib/usePaginatedList';
import { ROUTES } from 'src/shared/config/routes';
import './operation-list.css';

export function OperationList() {
  const location = useLocation();
  const { items, isFetching, isError, sentinelRef, reset } = usePaginatedList(useGetOperationsPageQuery);
  const operations = items.map(mapServerOperationToListItem);

  useEffect(() => {
    reset();
  }, [location.pathname, reset]);

  if (isError) {
    return <p className="operation-list__empty">Не удалось загрузить операции с сервера.</p>;
  }

  if (operations.length === 0 && !isFetching) {
    return <p className="operation-list__empty">Операций пока нет. Добавьте первую операцию.</p>;
  }

  return (
    <>
      <ul className="operation-list">
        {operations.map((operation) => (
          <li key={operation.id} className="operation-list__item">
            <OperationFull
              amount={formatOperationAmount(operation.amount)}
              categoryName={operation.categoryName}
              name={operation.name}
              description={operation.description}
              date={operation.date}
              editTo={ROUTES.operationEdit(operation.id)}
            />
          </li>
        ))}
      </ul>
      <div ref={sentinelRef} className="operation-list__sentinel" />
      {isFetching && <p className="operation-list__loading">Загрузка...</p>}
    </>
  );
}
