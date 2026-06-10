import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../shared/layout/Layout';
import { ThemeToggle } from '../shared/theme/ThemeToggle';
import { LanguageSwitcher } from '../shared/locale/LanguageSwitcher';
import { LocaleProvider } from './providers/LocaleProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import './styles/themes.scss';
import './App.css';

function AppContent() {
  const { t } = useTranslation();

  return (
    <Layout
      headerContent={
        <>
          <ThemeToggle />
          <LanguageSwitcher />
        </>
      }
    >
      <h1 className="app__title">{t('app.title')}</h1>
      <p className="app__text">{t('app.welcome')}</p>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AppContent />
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
