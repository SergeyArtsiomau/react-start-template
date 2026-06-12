import { isLongEnough, isNotDefinedString, isValidEmail } from 'src/utils/validation';
import type { AuthFormErrors, AuthFormValues } from './types';

export const validateAuthForm = (values: AuthFormValues): AuthFormErrors => {
  const errors: AuthFormErrors = {};

  if (isNotDefinedString(values.email)) {
    errors.email = 'Обязательное поле';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Некорректный email';
  }

  if (isNotDefinedString(values.password)) {
    errors.password = 'Обязательное поле';
  } else if (!isLongEnough(values.password)) {
    errors.password = 'Пароль слишком короткий (минимум 6 символов)';
  }

  return errors;
};
