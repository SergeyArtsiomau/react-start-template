import React, { memo } from 'react';
import type { FormikHandlers } from 'formik';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import type { ProfileFormProps } from '../types';

export type AboutFieldProps = Pick<ProfileFormProps, 'className' | 'disabled'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

export const AboutField = memo<AboutFieldProps>(
  ({ className, onChange, onBlur, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title="О себе" validateStatus={validateStatus} help={help}>
        <textarea
          disabled={disabled}
          name="about"
          rows={4}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder="Расскажите о себе"
        />
      </FormItem>
    );
  }
);

AboutField.displayName = 'AboutField';
