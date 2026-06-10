import React from 'react';
import { useTranslation } from 'react-i18next';

export function LocalizedText() {
  const { t } = useTranslation();

  return <p className="localized-text">{t('demo.greeting')}</p>;
}
