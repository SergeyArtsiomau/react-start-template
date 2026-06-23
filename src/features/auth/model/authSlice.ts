import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProfileFormValues } from 'src/features/forms/ProfileForm';
import type { RootState } from 'src/app/store/rootReducer';
import type { ServerProfile } from 'src/shared/api/types';

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

const mapProfile = (profile: ServerProfile, previousAbout = ''): ProfileFormValues => ({
  name: profile.name,
  about: previousAbout,
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setSessionFromProfile(
      state,
      action: PayloadAction<{ token: string; profile: ServerProfile; previousAbout?: string }>
    ) {
      state.token = action.payload.token;
      state.email = action.payload.profile.email;
      state.isAdmin = action.payload.profile.email.toLowerCase().startsWith('admin@');
      state.profile = mapProfile(action.payload.profile, action.payload.previousAbout ?? state.profile?.about ?? '');
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
      state.token = action.payload;
    },
  },
});

export const { setToken, setSessionFromProfile, setProfile, clearSession, restoreSessionFromToken } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectProfile = (state: RootState) => state.auth.profile;
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.token);

export default authSlice.reducer;
