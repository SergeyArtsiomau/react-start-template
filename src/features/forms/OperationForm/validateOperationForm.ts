import { isNotDefinedString, isValidAmount } from 'src/utils/validation';
import type { OperationFormErrors, OperationFormValues } from './types';

export const validateOperationForm = (values: OperationFormValues): OperationFormErrors => {
  const errors: OperationFormErrors = {};

  if (isNotDefinedString(values.name)) {
    errors.name = 'Обязательное поле';
  }

  if (isNotDefinedString(values.amount)) {
    errors.amount = 'Обязательное поле';
  } else if (!isValidAmount(values.amount)) {
    errors.amount = 'Введите корректную сумму';
  }

  if (isNotDefinedString(values.categoryId)) {
    errors.categoryId = 'Выберите категорию';
  }

  return errors;
};
