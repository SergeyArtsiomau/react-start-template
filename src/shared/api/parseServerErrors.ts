import type { ParsedSignupErrors, ServerErrorItem, ServerErrors } from './types';

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

export const parseServerErrors = (payload: unknown): ParsedSignupErrors => {
  const result: ParsedSignupErrors = {
    general: [],
    email: [],
  };

  const errors = (payload as ServerErrors)?.errors;

  if (!Array.isArray(errors) || errors.length === 0) {
    result.general.push('Произошла ошибка при регистрации');
    return result;
  }

  errors.forEach((error) => {
    if (isEmailRelatedError(error)) {
      result.email.push(error.message);
      return;
    }

    result.general.push(error.message);
  });

  if (result.general.length === 0 && result.email.length === 0) {
    result.general.push('Произошла ошибка при регистрации');
  }

  return result;
};
