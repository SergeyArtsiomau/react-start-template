import React, { useState } from 'react';
import { useSignupMutation } from 'src/shared/api/signupApi';
import type { ParsedSignupErrors } from 'src/shared/api/types';
import { SignupErrors } from './SignupErrors';
import './signup-form.css';

export function SignupFormRtkQuery() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { isLoading, isSuccess, data, error }] = useSignupMutation();

  const parsedErrors = (error as { data?: ParsedSignupErrors } | undefined)?.data ?? null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    signup({ email, password });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="signup-form__field">
        <label className="signup-form__label" htmlFor="signup-rtk-email">
          Email
        </label>
        <input
          id="signup-rtk-email"
          className={`signup-form__input${parsedErrors?.email.length ? ' signup-form__input--error' : ''}`}
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="signup-form__field">
        <label className="signup-form__label" htmlFor="signup-rtk-password">
          Пароль
        </label>
        <input
          id="signup-rtk-password"
          className="signup-form__input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isLoading}
        />
      </div>

      <SignupErrors errors={parsedErrors} />

      {isSuccess && data?.token && <p className="signup-form__success">Регистрация успешна. Token: {data.token}</p>}

      <button type="submit" className="signup-form__submit" disabled={isLoading}>
        {isLoading ? 'Отправка...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}
