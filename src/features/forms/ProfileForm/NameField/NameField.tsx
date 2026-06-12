import React, { memo } from 'react';
import type { FormikHandlers } from 'formik';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import type { ProfileFormProps } from '../types';

export type NameFieldProps = Pick<ProfileFormProps, 'className' | 'disabled' | 'autoFocusElement'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

export const NameField = memo<NameFieldProps>(
  ({ className, onChange, onBlur, autoFocusElement, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title="Имя" required validateStatus={validateStatus} help={help}>
        <input
          ref={autoFocusElement}
          disabled={disabled}
          autoFocus
          name="name"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder="Введите имя"
        />
      </FormItem>
    );
  }
);

NameField.displayName = 'NameField';
