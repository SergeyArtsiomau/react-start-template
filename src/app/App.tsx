import React from 'react';
import { AuthProvider } from 'src/features/auth';
import { FormsApp } from './FormsApp';

function App() {
  return (
    <AuthProvider>
      <FormsApp />
    </AuthProvider>
  );
}

export default App;
