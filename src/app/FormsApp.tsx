import React from 'react';
import { Layout } from 'src/shared/layout/Layout';
import { AuthFormPanel } from 'src/features/forms/AuthForm';
import { ProfileFormPanel } from 'src/features/forms/ProfileForm';
import { OperationFormPanel } from 'src/features/forms/OperationForm';
import { useAuth } from 'src/features/auth';
import './forms-app.css';

export function FormsApp() {
  const { user, login, register, logout, updateProfile } = useAuth();

  if (!user) {
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
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      logoTitle="FinanceApp"
      headerContent={
        <div className="forms-app__header">
          <span className="forms-app__user">{user.email}</span>
          <button type="button" className="forms-app__logout" onClick={logout}>
            Выйти
          </button>
        </div>
      }
    >
      <div className="forms-app forms-app--authenticated">
        <ProfileFormPanel initialValues={user.profile} onSubmitSuccess={updateProfile} />
        <OperationFormPanel />
      </div>
    </Layout>
  );
}
