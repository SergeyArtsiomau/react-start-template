import React from 'react';
import { Link } from 'react-router-dom';
import { SignupFormFetch } from 'src/features/signup/ui/SignupFormFetch';
import { SignupFormRtkQuery } from 'src/features/signup/ui/SignupFormRtkQuery';
import { ROUTES } from 'src/shared/config/routes';
import './registration-page.css';

export function RegistrationPage() {
  return (
    <div className="registration-page">
      <div className="registration-page__header">
        <h1 className="registration-page__title">Регистрация на сервере</h1>
        <Link to={ROUTES.ROOT} className="registration-page__back">
          ← К приложению
        </Link>
      </div>

      <p className="registration-page__hint">
        Валидация на фронтенде отключена — ошибки приходят с сервера. Для проверки email введите некорректное значение,
        например <code>invalid</code>.
      </p>

      <div className="registration-page__grid">
        <section className="registration-page__card">
          <h2 className="registration-page__card-title">Вариант 1: fetch в компоненте</h2>
          <SignupFormFetch />
        </section>

        <section className="registration-page__card">
          <h2 className="registration-page__card-title">Вариант 2: Redux Toolkit Query</h2>
          <SignupFormRtkQuery />
        </section>
      </div>
    </div>
  );
}
