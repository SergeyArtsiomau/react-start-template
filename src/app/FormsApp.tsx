import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'src/shared/layout/Layout';
import { AuthFormPanel } from 'src/features/forms/AuthForm';
import { useAuth } from 'src/features/auth';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { selectIsAuthenticated } from 'src/features/auth/model/authSlice';
import { selectIsInitialized } from 'src/app/model/appSlice';
import { loginThunk, registerThunk } from 'src/features/auth/model/authThunks';
import { RegistrationPage } from 'src/pages/registration';
import { AppNavigation } from 'src/widgets/app-navigation';
import { getFirstServerError } from 'src/shared/api/parseServerErrors';
import type { ParsedServerErrors } from 'src/shared/api/types';
import type { AuthFormValues, AuthMode } from 'src/features/forms/AuthForm';
import { AppRoutes } from './AppRoutes';
import { ROUTES } from 'src/shared/config/routes';
import './forms-app.css';

export function FormsApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectIsInitialized);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { user, logout } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.ROOT, { replace: true });
  };

  const handleAuth = async (values: AuthFormValues, mode: AuthMode) => {
    setAuthError(null);
    setAuthLoading(true);

    try {
      if (mode === 'signIn') {
        await dispatch(loginThunk(values)).unwrap();
      } else {
        await dispatch(registerThunk(values)).unwrap();
      }

      navigate(ROUTES.OPERATIONS, { replace: true });
    } catch (error) {
      const parsed = error as ParsedServerErrors;
      setAuthError(getFirstServerError(parsed) ?? 'Ошибка авторизации');
    } finally {
      setAuthLoading(false);
    }
  };

  if (!initialized) {
    return null;
  }

  if (location.pathname === ROUTES.REGISTRATION) {
    return (
      <Layout
        logoTitle="FinanceApp"
        logoTo={isAuthenticated ? ROUTES.OPERATIONS : ROUTES.ROOT}
        headerContent={
          isAuthenticated ? (
            <AppNavigation userEmail={user?.email ?? ''} onLogout={handleLogout} />
          ) : (
            <span className="forms-app__header-hint">Домашнее задание: REST API</span>
          )
        }
      >
        <RegistrationPage />
      </Layout>
    );
  }

  if (!isAuthenticated) {
    if (location.pathname !== ROUTES.ROOT) {
      return <Navigate to={ROUTES.ROOT} replace />;
    }

    return (
      <Layout
        logoTitle="FinanceApp"
        headerContent={<span className="forms-app__header-hint">Войдите, чтобы продолжить</span>}
      >
        <div className="forms-app">
          <AuthFormPanel disabled={authLoading} serverError={authError} onAuth={handleAuth} />
          <p className="forms-app__admin-hint">Используйте email и пароль, зарегистрированные на REST API сервере</p>
          <Link to={ROUTES.REGISTRATION} className="forms-app__registration-link">
            Демо регистрации (fetch / RTK Query) →
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      logoTitle="FinanceApp"
      logoTo={ROUTES.OPERATIONS}
      headerContent={<AppNavigation userEmail={user?.email ?? ''} onLogout={handleLogout} />}
    >
      <AppRoutes />
    </Layout>
  );
}
