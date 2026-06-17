import React from 'react';
import { OperationFull } from 'src/shared/operation/OperationFull';
import { formatOperationAmount, useOperations } from 'src/entities/operation';
import { ROUTES } from 'src/shared/config/routes';
import './operation-list.css';

export function OperationList() {
  const { operations } = useOperations();

  if (operations.length === 0) {
    return <p className="operation-list__empty">Операций пока нет. Добавьте первую операцию.</p>;
  }

  return (
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
  );
}
