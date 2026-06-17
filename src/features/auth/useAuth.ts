import type { AuthFormValues } from 'src/features/forms/AuthForm';
import type { ProfileFormValues } from 'src/features/forms/ProfileForm';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { selectEmail, selectProfile } from './model/authSlice';
import { loginThunk, logoutThunk, registerThunk, updateProfileThunk } from './model/authThunks';

export type AuthUser = {
  email: string;
  profile: ProfileFormValues;
};

export function useAuth() {
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectEmail);
  const profile = useAppSelector(selectProfile);

  const user: AuthUser | null =
    email && profile
      ? {
          email,
          profile,
        }
      : null;

  return {
    user,
    login: (values: AuthFormValues) => dispatch(loginThunk(values)),
    register: (values: AuthFormValues) => dispatch(registerThunk(values)),
    logout: () => dispatch(logoutThunk()),
    updateProfile: (values: ProfileFormValues) => dispatch(updateProfileThunk(values)),
  };
}
