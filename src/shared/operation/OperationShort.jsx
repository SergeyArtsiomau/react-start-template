import React from 'react';
import './operation.css';

export function OperationShort({ amount, categoryName, name, description }) {
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
