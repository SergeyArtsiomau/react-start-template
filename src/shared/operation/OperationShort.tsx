import React from 'react';
import type { OperationBaseProps } from '../types/ui';
import './operation.css';

export type OperationShortProps = OperationBaseProps;

export function OperationShort({ amount, categoryName, name, description }: OperationShortProps) {
  return (
    <article className="operation operation--short">
      <div className="operation__top">
        <span className="operation__category">{categoryName}</span>
        <span className="operation__amount">{amount}</span>
      </div>
      <h3 className="operation__name">{name}</h3>
      <p className="operation__description operation__description--short">{description}</p>
    </article>
  );
}
