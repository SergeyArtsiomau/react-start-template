import React, { type ReactNode } from 'react';
import { Header } from '../header/Header';
import './layout.css';

export interface LayoutProps {
  logoTitle: string;
  logoTo?: string;
  headerContent: ReactNode;
  children: ReactNode;
}

export function Layout({ logoTitle, logoTo, headerContent, children }: LayoutProps) {
  return (
    <div className="app-layout">
      <Header logoTitle={logoTitle} logoTo={logoTo}>
        {headerContent}
      </Header>
      <main className="app-layout__main">{children}</main>
    </div>
  );
}
