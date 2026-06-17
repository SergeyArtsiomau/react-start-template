import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';

const redirectLegacyStorybookUrl = () => {
  const { pathname, search } = window.location;

  if (!search.includes('path=')) {
    return;
  }

  const isAppRoot = pathname === '/' || pathname === '/react-start-template' || pathname === '/react-start-template/';

  if (isAppRoot) {
    const storybookPath = pathname.endsWith('/') ? `${pathname}storybook/` : `${pathname}/storybook/`;
    window.location.replace(`${storybookPath}${search}`);
  }
};

redirectLegacyStorybookUrl();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
