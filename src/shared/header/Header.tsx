import React, { type ReactNode } from 'react';
import { Logo } from '../logo/Logo';
import './header.css';

export interface HeaderProps {
  logoTitle?: string;
  children?: ReactNode;
}

export function Header({ logoTitle = 'FinanceApp', children }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Logo title={logoTitle} />
        {children && <div className="app-header__content">{children}</div>}
      </div>
    </header>
  );
}
