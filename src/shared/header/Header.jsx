import React from 'react';
import { Logo } from '../logo/Logo';
import './header.css';

export function Header({ logoTitle = 'FinanceApp', children }) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Logo title={logoTitle} />
        {children && <div className="app-header__content">{children}</div>}
      </div>
    </header>
  );
}
