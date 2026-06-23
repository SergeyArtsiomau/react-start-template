import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/store';
import { selectIsAuthenticated } from 'src/features/auth/model/authSlice';
import { ROUTES } from 'src/shared/config/routes';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.ROOT} replace />;
  }

  return <>{children}</>;
}
