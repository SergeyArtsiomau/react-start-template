import React from 'react';
import { Link } from 'react-router-dom';
import './logo.css';

export interface LogoProps {
  title?: string;
  to?: string;
}

export function Logo({ title = 'FinanceApp', to }: LogoProps) {
  const content = (
    <>
      <span className="logo__mark" aria-hidden="true" />
      <span className="logo__title">{title}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className="logo logo--link">
        {content}
      </Link>
    );
  }

  return <div className="logo">{content}</div>;
}
