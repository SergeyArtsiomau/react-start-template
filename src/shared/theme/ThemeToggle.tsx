import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../app/providers/ThemeProvider';
import './theme-toggle.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? t('theme.dark') : t('theme.light')}
    </button>
  );
}
