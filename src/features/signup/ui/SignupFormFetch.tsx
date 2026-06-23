import React, { useState } from 'react';
import { SignupRequestError, signupRequest } from 'src/shared/api/signupRequest';
import type { ParsedSignupErrors } from 'src/shared/api/types';
import { SignupErrors } from './SignupErrors';
import './signup-form.css';

export function SignupFormFetch() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ParsedSignupErrors | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrors(null);
    setToken(null);

    try {
      const result = await signupRequest(email, password);
      setToken(result.token);
    } catch (error) {
      if (error instanceof SignupRequestError) {
        setErrors(error.parsedErrors);
      } else {
        setErrors({ general: ['Не удалось выполнить запрос'], email: [], password: [] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="signup-form__field">
        <label className="signup-form__label" htmlFor="signup-fetch-email">
          Email
        </label>
        <input
          id="signup-fetch-email"
          className={`signup-form__input${errors?.email.length ? ' signup-form__input--error' : ''}`}
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
        />
      </div>

      <div className="signup-form__field">
        <label className="signup-form__label" htmlFor="signup-fetch-password">
          Пароль
        </label>
        <input
          id="signup-fetch-password"
          className="signup-form__input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loading}
        />
      </div>

      <SignupErrors errors={errors} />

      {token && <p className="signup-form__success">Регистрация успешна. Token: {token}</p>}

      <button type="submit" className="signup-form__submit" disabled={loading}>
        {loading ? 'Отправка...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}
