import React from 'react';
import { Header } from '../header/Header';
import './layout.css';

export function Layout({ logoTitle = 'FinanceApp', headerContent, children }) {
  return (
    <div className="app-layout">
      <Header logoTitle={logoTitle}>{headerContent}</Header>
      <main className="app-layout__main">{children}</main>
    </div>
  );
}
