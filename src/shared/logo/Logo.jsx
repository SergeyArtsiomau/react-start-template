import React from 'react';
import './logo.css';

export function Logo({ title = 'FinanceApp' }) {
  return (
    <div className="logo">
      <span className="logo__mark" aria-hidden="true" />
      <span className="logo__title">{title}</span>
    </div>
  );
}
