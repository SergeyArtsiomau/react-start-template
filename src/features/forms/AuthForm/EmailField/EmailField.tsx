import React, { memo } from 'react';
import type { FormikHandlers } from 'formik';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import type { AuthFormProps } from '../types';

export type EmailFieldProps = Pick<AuthFormProps, 'className' | 'disabled' | 'autoFocusElement'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

export const EmailField = memo<EmailFieldProps>(
  ({ className, onChange, onBlur, onKeyDown, autoFocusElement, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title="Email" required validateStatus={validateStatus} help={help}>
        <input
          ref={autoFocusElement}
          disabled={disabled}
          autoFocus
          type="email"
          name="email"
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          value={value}
          placeholder="user@example.com"
        />
      </FormItem>
    );
  }
);

EmailField.displayName = 'EmailField';
