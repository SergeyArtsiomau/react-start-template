import React, { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { AuthFormValues } from 'src/features/forms/AuthForm';
import type { ProfileFormValues } from 'src/features/forms/ProfileForm';

export type AuthUser = {
  email: string;
  profile: ProfileFormValues;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (values: AuthFormValues) => void;
  register: (values: AuthFormValues) => void;
  logout: () => void;
  updateProfile: (profile: ProfileFormValues) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const createUser = (values: AuthFormValues): AuthUser => ({
  email: values.email,
  profile: {
    name: values.email.split('@')[0],
    about: '',
  },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((values: AuthFormValues) => {
    setUser(createUser(values));
  }, []);

  const register = useCallback((values: AuthFormValues) => {
    setUser(createUser(values));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((profile: ProfileFormValues) => {
    setUser((current) => (current ? { ...current, profile } : current));
  }, []);

  const value = useMemo(
    () => ({ user, login, register, logout, updateProfile }),
    [user, login, register, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }

  return context;
}
