import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'src/app/store';
import { APP_BASENAME } from './config';
import { AppInitializer } from './providers/AppInitializer';
import { AppLoader } from './providers/AppLoader';
import { FormsApp } from './FormsApp';

function App() {
  return (
    <Provider store={store}>
      <AppInitializer>
        <BrowserRouter basename={APP_BASENAME}>
          <AppLoader />
          <FormsApp />
        </BrowserRouter>
      </AppInitializer>
    </Provider>
  );
}

export default App;
