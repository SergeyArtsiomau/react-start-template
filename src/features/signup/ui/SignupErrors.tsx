import React from 'react';
import type { ParsedSignupErrors } from 'src/shared/api/types';
import './signup-form.css';

type SignupErrorsProps = {
  errors: ParsedSignupErrors | null;
};

export function SignupErrors({ errors }: SignupErrorsProps) {
  if (!errors) {
    return null;
  }

  return (
    <div className="signup-form__errors" role="alert">
      {errors.email.map((message) => (
        <p key={`email-${message}`} className="signup-form__error signup-form__error--email">
          Email: {message}
        </p>
      ))}
      {errors.general.map((message) => (
        <p key={`general-${message}`} className="signup-form__error">
          {message}
        </p>
      ))}
    </div>
  );
}
