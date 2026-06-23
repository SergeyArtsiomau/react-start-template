import React from 'react';
import { useAppSelector } from 'src/app/store';
import { selectIsInitialized } from 'src/app/model/appSlice';
import './app-loader.css';

export function AppLoader() {
  const initialized = useAppSelector(selectIsInitialized);

  if (initialized) {
    return null;
  }

  return (
    <div className="app-loader" role="status" aria-live="polite">
      Загрузка приложения...
    </div>
  );
}
