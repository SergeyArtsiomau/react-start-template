import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { setSessionFromProfile, clearSession } from 'src/features/auth/model/authSlice';
import { loginThunk, logoutThunk, registerThunk } from 'src/features/auth/model/authThunks';
import { writeTokenToStorage, removeTokenFromStorage } from 'src/shared/lib/tokenStorage';
import { api } from 'src/shared/api/api';
import { rootReducer, type RootState } from './rootReducer';

export const tokenStorageListener = createListenerMiddleware();

tokenStorageListener.startListening({
  matcher: isAnyOf(setSessionFromProfile, loginThunk.fulfilled, registerThunk.fulfilled),
  effect: (_, listenerApi) => {
    const token = (listenerApi.getState() as RootState).auth.token;

    if (token) {
      writeTokenToStorage(token);
    }
  },
});

tokenStorageListener.startListening({
  matcher: isAnyOf(clearSession, logoutThunk.fulfilled),
  effect: () => {
    removeTokenFromStorage();
  },
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    })
      .prepend(tokenStorageListener.middleware)
      .concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
