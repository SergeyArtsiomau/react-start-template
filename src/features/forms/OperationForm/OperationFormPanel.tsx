import React, { memo } from 'react';
import cn from 'clsx';
import { useFormik } from 'formik';
import { OperationForm } from './OperationForm';
import type { OperationFormValues } from './types';
import { validateOperationForm } from './validateOperationForm';
import '../forms.css';

export type OperationFormPanelProps = {
  className?: string;
  disabled?: boolean;
  title?: string;
  submitLabel?: string;
  initialValues?: OperationFormValues;
};

const defaultValues: OperationFormValues = {
  name: '',
  amount: '',
  categoryName: '',
  description: '',
};

export const OperationFormPanel = memo<OperationFormPanelProps>(
  ({ className, disabled, title = 'Операция', submitLabel = 'Сохранить операцию', initialValues = defaultValues }) => {
    const formManager = useFormik<OperationFormValues>({
      initialValues,
      enableReinitialize: true,
      validate: validateOperationForm,
      onSubmit: (values, { resetForm }) => {
        console.log('OperationForm submit:', values);
        resetForm();
      },
    });

    return (
      <div className={cn('form-panel', className)}>
        <h2 className="form-panel__title">{title}</h2>
        <OperationForm formManager={formManager} disabled={disabled} />
        <button
          type="button"
          className="form-panel__submit"
          disabled={disabled}
          onClick={() => formManager.submitForm()}
        >
          {submitLabel}
        </button>
      </div>
    );
  }
);

OperationFormPanel.displayName = 'OperationFormPanel';
