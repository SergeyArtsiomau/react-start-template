import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../app/providers/LocaleProvider';
import type { Language } from '../../app/i18n/config';
import './language-switcher.css';

const LANGUAGES: Language[] = ['ru', 'en'];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLocale();
  const { t } = useTranslation();

  return (
    <div className="language-switcher" role="group" aria-label={t('demo.languageLabel')}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`language-switcher__btn${language === lang ? ' language-switcher__btn--active' : ''}`}
          onClick={() => setLanguage(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
