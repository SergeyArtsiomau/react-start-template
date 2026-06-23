import React, { memo, useEffect, useState } from 'react';
import cn from 'clsx';
import { useFormik } from 'formik';
import { AuthForm } from './AuthForm';
import type { AuthFormValues } from './types';
import { validateAuthForm } from './validateAuthForm';
import '../forms.css';

export type AuthMode = 'signIn' | 'signUp';

export type AuthFormPanelProps = {
  className?: string;
  disabled?: boolean;
  mode?: AuthMode;
  serverError?: string | null;
  onAuth?: (values: AuthFormValues, mode: AuthMode) => void | Promise<void>;
};

const defaultValues: AuthFormValues = {
  email: '',
  password: '',
};

export const AuthFormPanel = memo<AuthFormPanelProps>(
  ({ className, disabled, mode: initialMode = 'signIn', serverError, onAuth }) => {
    const [mode, setMode] = useState<AuthMode>(initialMode);

    useEffect(() => {
      setMode(initialMode);
    }, [initialMode]);

    const formManager = useFormik<AuthFormValues>({
      initialValues: defaultValues,
      validate: validateAuthForm,
      onSubmit: async (values, { resetForm }) => {
        await onAuth?.(values, mode);
        resetForm();
      },
    });

    const submitLabel = mode === 'signIn' ? 'Войти' : 'Зарегистрироваться';

    return (
      <div className={cn('form-panel', className)}>
        <h2 className="form-panel__title">{mode === 'signIn' ? 'Вход' : 'Регистрация'}</h2>

        <div className="form-tabs">
          <button
            type="button"
            className={cn('form-tabs__button', mode === 'signIn' && 'form-tabs__button--active')}
            onClick={() => setMode('signIn')}
          >
            Вход
          </button>
          <button
            type="button"
            className={cn('form-tabs__button', mode === 'signUp' && 'form-tabs__button--active')}
            onClick={() => setMode('signUp')}
          >
            Регистрация
          </button>
        </div>

        {serverError && <p className="form-panel__error">{serverError}</p>}
        <AuthForm formManager={formManager} disabled={disabled} />
        <button
          type="button"
          className="form-panel__submit"
          disabled={disabled}
          onClick={() => formManager.submitForm()}
        >
          {disabled ? 'Отправка...' : submitLabel}
        </button>
      </div>
    );
  }
);

AuthFormPanel.displayName = 'AuthFormPanel';
