import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'src/shared/layout/Layout';
import { AuthFormPanel } from 'src/features/forms/AuthForm';
import { useAuth } from 'src/features/auth';
import { useAppSelector } from 'src/app/store';
import { selectIsAuthenticated } from 'src/features/auth/model/authSlice';
import { selectIsInitialized } from 'src/app/model/appSlice';
import { RegistrationPage } from 'src/pages/registration';
import { AppNavigation } from 'src/widgets/app-navigation';
import { AppRoutes } from './AppRoutes';
import { ROUTES } from 'src/shared/config/routes';
import './forms-app.css';

export function FormsApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialized = useAppSelector(selectIsInitialized);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { user, login, register, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.ROOT, { replace: true });
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
          <AuthFormPanel
            onAuth={(values, mode) => {
              if (mode === 'signIn') {
                login(values);
              } else {
                register(values);
              }
            }}
          />
          <p className="forms-app__admin-hint">Для редактирования операций войдите как admin@example.com</p>
          <Link to={ROUTES.REGISTRATION} className="forms-app__registration-link">
            Регистрация на REST API сервере →
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
