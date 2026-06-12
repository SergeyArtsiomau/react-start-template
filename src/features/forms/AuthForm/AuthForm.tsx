import React, { memo } from 'react';
import cn from 'clsx';
import type { AuthFormProps } from './types';
import { PasswordField } from './PasswordField';
import { EmailField } from './EmailField';

export const AuthForm = memo<AuthFormProps>(({ className, formManager, formElement, autoFocusElement, disabled }) => {
  const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange, submitForm } = formManager;

  const handleEnterSubmit: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      submitForm();
    }
  };

  return (
    <form ref={formElement} onSubmit={handleSubmit} className={cn(className)}>
      <EmailField
        autoFocusElement={autoFocusElement}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleEnterSubmit}
        value={values.email}
        errors={errors.email ?? ''}
        submitCount={submitCount}
        touched={touched.email}
        disabled={disabled}
      />
      <PasswordField
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleEnterSubmit}
        value={values.password}
        errors={errors.password ?? ''}
        submitCount={submitCount}
        touched={touched.password}
        disabled={disabled}
      />
    </form>
  );
});

AuthForm.displayName = 'AuthForm';
