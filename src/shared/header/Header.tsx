import React, { type ReactNode } from 'react';
import { Logo } from '../logo/Logo';
import './header.css';

export interface HeaderProps {
  logoTitle?: string;
  logoTo?: string;
  children?: ReactNode;
}

export function Header({ logoTitle = 'FinanceApp', logoTo, children }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Logo title={logoTitle} to={logoTo} />
        {children && <div className="app-header__content">{children}</div>}
      </div>
    </header>
  );
}
