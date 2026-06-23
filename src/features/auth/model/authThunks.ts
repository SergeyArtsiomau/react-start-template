import { createAsyncThunk } from '@reduxjs/toolkit';
import { setInitialized } from 'src/app/model/appSlice';
import { api } from 'src/shared/api/api';
import { getFirstServerError, parseServerErrors } from 'src/shared/api/parseServerErrors';
import type { ParsedServerErrors } from 'src/shared/api/types';
import type { AuthFormValues } from 'src/features/forms/AuthForm';
import type { ProfileFormValues } from 'src/features/forms/ProfileForm';
import { readTokenFromStorage } from 'src/shared/lib/tokenStorage';
import { clearSession, restoreSessionFromToken, setProfile, setSessionFromProfile } from './authSlice';
import type { RootState } from 'src/app/store/rootReducer';

export const initializeAuthThunk = createAsyncThunk('auth/initialize', async (_, { dispatch }) => {
  const storedToken = readTokenFromStorage();

  if (storedToken) {
    dispatch(restoreSessionFromToken(storedToken));

    try {
      const profile = await dispatch(api.endpoints.getProfile.initiate(undefined, { forceRefetch: true })).unwrap();
      dispatch(
        setSessionFromProfile({
          token: storedToken,
          profile,
        })
      );
    } catch {
      dispatch(clearSession());
    }
  }

  dispatch(setInitialized());
});

export const loginThunk = createAsyncThunk<
  void,
  AuthFormValues,
  { rejectValue: ParsedServerErrors }
>('auth/login', async (values, { dispatch, rejectWithValue }) => {
  try {
    const authResult = await dispatch(
      api.endpoints.signin.initiate({
        email: values.email,
        password: values.password,
      })
    ).unwrap();

    const profile = await dispatch(api.endpoints.getProfile.initiate(undefined, { forceRefetch: true })).unwrap();

    dispatch(
      setSessionFromProfile({
        token: authResult.token,
        profile,
      })
    );
  } catch (error) {
    const parsed = (error as { data?: ParsedServerErrors })?.data ?? parseServerErrors(error, 'Ошибка авторизации');
    return rejectWithValue(parsed);
  }
});

export const registerThunk = createAsyncThunk<
  void,
  AuthFormValues,
  { rejectValue: ParsedServerErrors }
>('auth/register', async (values, { dispatch, rejectWithValue }) => {
  try {
    const authResult = await dispatch(
      api.endpoints.signup.initiate({
        email: values.email,
        password: values.password,
      })
    ).unwrap();

    const profile = await dispatch(api.endpoints.getProfile.initiate(undefined, { forceRefetch: true })).unwrap();

    dispatch(
      setSessionFromProfile({
        token: authResult.token,
        profile,
      })
    );
  } catch (error) {
    const parsed = (error as { data?: ParsedServerErrors })?.data ?? parseServerErrors(error, 'Ошибка регистрации');
    return rejectWithValue(parsed);
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  dispatch(clearSession());
  dispatch(api.util.resetApiState());
});

export const syncTokenFromStorageThunk = createAsyncThunk<void, string | null, { state: RootState }>(
  'auth/syncFromStorage',
  async (token, { dispatch, getState }) => {
    if (!token) {
      dispatch(clearSession());
      dispatch(api.util.resetApiState());
      return;
    }

    const previousAbout = getState().auth.profile?.about ?? '';
    dispatch(restoreSessionFromToken(token));

    try {
      const profile = await dispatch(api.endpoints.getProfile.initiate(undefined, { forceRefetch: true })).unwrap();
      dispatch(
        setSessionFromProfile({
          token,
          profile,
          previousAbout,
        })
      );
    } catch {
      dispatch(clearSession());
      dispatch(api.util.resetApiState());
    }
  }
);

export const updateProfileThunk = createAsyncThunk<
  void,
  ProfileFormValues,
  { rejectValue: string; state: RootState }
>('auth/updateProfile', async (profile, { dispatch, getState, rejectWithValue }) => {
  const token = getState().auth.token;

  if (!token) {
    return rejectWithValue('Пользователь не авторизован');
  }

  try {
    const updatedProfile = await dispatch(
      api.endpoints.updateProfile.initiate({
        name: profile.name,
      })
    ).unwrap();

    dispatch(
      setSessionFromProfile({
        token,
        profile: updatedProfile,
        previousAbout: profile.about,
      })
    );
    dispatch(setProfile(profile));
  } catch (error) {
    const parsed = (error as { data?: ParsedServerErrors })?.data ?? parseServerErrors(error, 'Ошибка сохранения профиля');
    return rejectWithValue(getFirstServerError(parsed) ?? 'Ошибка сохранения профиля');
  }
});
