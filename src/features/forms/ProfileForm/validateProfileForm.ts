import { isNotDefinedString } from 'src/utils/validation';
import type { ProfileFormErrors, ProfileFormValues } from './types';

export const validateProfileForm = (values: ProfileFormValues): ProfileFormErrors => {
  const errors = {} as ProfileFormErrors;

  if (isNotDefinedString(values.name)) {
    errors.name = 'Обязательное поле';
  }

  return errors;
};
