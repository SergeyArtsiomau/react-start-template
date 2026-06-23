import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthFormValues } from 'src/features/forms/AuthForm';
import type { ProfileFormValues } from 'src/features/forms/ProfileForm';
import { setInitialized } from 'src/app/model/appSlice';
import { buildSession, clearSession, restoreSessionFromToken, setProfile, setSession } from './authSlice';
import { readTokenFromStorage } from 'src/shared/lib/tokenStorage';

export const initializeAuthThunk = createAsyncThunk('auth/initialize', async (_, { dispatch }) => {
  const storedToken = readTokenFromStorage();

  if (storedToken) {
    dispatch(restoreSessionFromToken(storedToken));
  }

  dispatch(setInitialized());
});

export const loginThunk = createAsyncThunk('auth/login', async (values: AuthFormValues, { dispatch }) => {
  dispatch(setSession(buildSession(values.email)));
});

export const registerThunk = createAsyncThunk('auth/register', async (values: AuthFormValues, { dispatch }) => {
  dispatch(setSession(buildSession(values.email)));
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  dispatch(clearSession());
});

export const syncTokenFromStorageThunk = createAsyncThunk(
  'auth/syncFromStorage',
  async (token: string | null, { dispatch }) => {
    if (token) {
      dispatch(restoreSessionFromToken(token));
      return;
    }

    dispatch(clearSession());
  }
);

export const updateProfileThunk = createAsyncThunk(
  'auth/updateProfile',
  async (profile: ProfileFormValues, { dispatch }) => {
    dispatch(setProfile(profile));
  }
);
