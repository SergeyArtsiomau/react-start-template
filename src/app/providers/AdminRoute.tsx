import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/store';
import { selectIsAdmin } from 'src/features/auth/model/authSlice';
import { ROUTES } from 'src/shared/config/routes';

export function AdminRoute({ children }: { children: ReactNode }) {
  const isAdmin = useAppSelector(selectIsAdmin);

  if (!isAdmin) {
    return <Navigate to={ROUTES.OPERATIONS} replace />;
  }

  return <>{children}</>;
}
