import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProfileFormValues } from 'src/features/forms/ProfileForm';
import type { RootState } from 'src/app/store/rootReducer';
import { createToken, parseToken } from 'src/shared/lib/tokenStorage';

type AuthState = {
  token: string | null;
  email: string | null;
  profile: ProfileFormValues | null;
  isAdmin: boolean;
};

const initialState: AuthState = {
  token: null,
  email: null,
  profile: null,
  isAdmin: false,
};

const createProfile = (email: string): ProfileFormValues => ({
  name: email.split('@')[0],
  about: '',
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<{ token: string; email: string; isAdmin: boolean }>) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.profile = createProfile(action.payload.email);
    },
    setProfile(state, action: PayloadAction<ProfileFormValues>) {
      state.profile = action.payload;
    },
    clearSession(state) {
      state.token = null;
      state.email = null;
      state.profile = null;
      state.isAdmin = false;
    },
    restoreSessionFromToken(state, action: PayloadAction<string>) {
      const payload = parseToken(action.payload);

      if (!payload) {
        return;
      }

      state.token = action.payload;
      state.email = payload.email;
      state.isAdmin = payload.role === 'admin';
      state.profile = createProfile(payload.email);
    },
  },
});

export const { setSession, setProfile, clearSession, restoreSessionFromToken } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectProfile = (state: RootState) => state.auth.profile;
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.token);

export default authSlice.reducer;

export const buildSession = (email: string) => {
  const token = createToken(email);
  const payload = parseToken(token);

  return {
    token,
    email,
    isAdmin: payload?.role === 'admin',
  };
};
