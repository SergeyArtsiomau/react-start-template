import React, { type ReactNode } from 'react';
import { Header } from '../header/Header';
import './layout.css';

export interface LayoutProps {
  logoTitle?: string;
  headerContent?: ReactNode;
  children?: ReactNode;
}

export function Layout({ logoTitle = 'FinanceApp', headerContent, children }: LayoutProps) {
  return (
    <div className="app-layout">
      <Header logoTitle={logoTitle}>{headerContent}</Header>
      <main className="app-layout__main">{children}</main>
    </div>
  );
}
