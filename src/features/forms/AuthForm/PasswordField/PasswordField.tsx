import React, { memo } from 'react';
import type { FormikHandlers } from 'formik';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import type { AuthFormProps } from '../types';

export type PasswordFieldProps = Pick<AuthFormProps, 'className' | 'disabled'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

export const PasswordField = memo<PasswordFieldProps>(
  ({ className, onChange, onBlur, onKeyDown, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title="Пароль" required validateStatus={validateStatus} help={help}>
        <input
          disabled={disabled}
          type="password"
          name="password"
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          value={value}
          placeholder="Минимум 6 символов"
        />
      </FormItem>
    );
  }
);

PasswordField.displayName = 'PasswordField';
