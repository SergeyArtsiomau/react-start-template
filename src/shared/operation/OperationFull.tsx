import React from 'react';
import type { OperationBaseProps } from '../types/ui';
import './operation.css';

export interface OperationFullProps extends OperationBaseProps {
  date: string;
}

export function OperationFull({ amount, categoryName, name, description, date }: OperationFullProps) {
  return (
    <article className="operation operation--full">
      <div className="operation__top">
        <span className="operation__category">{categoryName}</span>
        <span className="operation__amount">{amount}</span>
      </div>
      <h3 className="operation__name">{name}</h3>
      <p className="operation__date">{date}</p>
      <p className="operation__description">{description}</p>
      <button type="button" className="operation__edit" disabled>
        Редактировать
      </button>
    </article>
  );
}
