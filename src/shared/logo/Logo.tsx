import React from 'react';
import './logo.css';

export interface LogoProps {
  title?: string;
}

export function Logo({ title = 'FinanceApp' }: LogoProps) {
  return (
    <div className="logo">
      <span className="logo__mark" aria-hidden="true" />
      <span className="logo__title">{title}</span>
    </div>
  );
}
