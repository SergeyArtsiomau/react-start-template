import React from 'react';
import { AuthProvider } from 'src/features/auth';
import { OperationsProvider } from 'src/entities/operation';
import { BrowserRouter } from 'react-router-dom';
import { APP_BASENAME } from './config';
import { FormsApp } from './FormsApp';

function App() {
  return (
    <AuthProvider>
      <OperationsProvider>
        <BrowserRouter basename={APP_BASENAME}>
          <FormsApp />
        </BrowserRouter>
      </OperationsProvider>
    </AuthProvider>
  );
}

export default App;
