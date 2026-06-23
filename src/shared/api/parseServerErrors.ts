import type { ParsedServerErrors, ServerErrorItem, ServerErrors } from './types';

const isEmailRelatedError = (error: ServerErrorItem): boolean => {
  const message = error.message.toLowerCase();
  const code = error.extensions?.code ?? '';

  if (error.fieldName === 'email') {
    return true;
  }

  if (message.includes('email')) {
    return true;
  }

  if (code === 'ERR_VALIDATION_ERROR' && message.includes('valid email')) {
    return true;
  }

  return false;
};

const isPasswordRelatedError = (error: ServerErrorItem): boolean => {
  const message = error.message.toLowerCase();
  const code = error.extensions?.code ?? '';

  if (error.fieldName === 'password') {
    return true;
  }

  if (message.includes('password')) {
    return true;
  }

  if (code === 'ERR_INCORRECT_EMAIL_OR_PASSWORD' || code === 'ERR_INVALID_PASSWORD') {
    return true;
  }

  return false;
};

export const parseServerErrors = (payload: unknown, fallbackMessage = 'Произошла ошибка'): ParsedServerErrors => {
  const result: ParsedServerErrors = {
    general: [],
    email: [],
    password: [],
  };

  const errors = (payload as ServerErrors)?.errors;

  if (!Array.isArray(errors) || errors.length === 0) {
    result.general.push(fallbackMessage);
    return result;
  }

  errors.forEach((error) => {
    if (isEmailRelatedError(error)) {
      result.email.push(error.message);
      return;
    }

    if (isPasswordRelatedError(error)) {
      result.password.push(error.message);
      return;
    }

    result.general.push(error.message);
  });

  if (result.general.length === 0 && result.email.length === 0 && result.password.length === 0) {
    result.general.push(fallbackMessage);
  }

  return result;
};

export const getFirstServerError = (errors: ParsedServerErrors): string | null => {
  return errors.email[0] ?? errors.password[0] ?? errors.general[0] ?? null;
};
