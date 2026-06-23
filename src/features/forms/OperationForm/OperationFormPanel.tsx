import React, { memo } from 'react';
import cn from 'clsx';
import { useFormik } from 'formik';
import { OperationForm } from './OperationForm';
import type { OperationFormValues } from './types';
import { EMPTY_OPERATION_FORM_VALUES } from './types';
import { validateOperationForm } from './validateOperationForm';
import '../forms.css';

export type OperationFormPanelProps = {
  className?: string;
  disabled?: boolean;
  title?: string;
  submitLabel?: string;
  initialValues?: OperationFormValues;
  categories?: Array<{ id: string; name: string }>;
  serverError?: string | null;
  onSubmitSuccess?: (values: OperationFormValues) => void;
};

export const OperationFormPanel = memo<OperationFormPanelProps>(
  ({
    className,
    disabled,
    title = 'Операция',
    submitLabel = 'Сохранить операцию',
    initialValues = EMPTY_OPERATION_FORM_VALUES,
    categories = [],
    serverError,
    onSubmitSuccess,
  }) => {
    const formManager = useFormik<OperationFormValues>({
      initialValues,
      enableReinitialize: true,
      validate: validateOperationForm,
      onSubmit: (values, { resetForm }) => {
        onSubmitSuccess?.(values);

        if (!onSubmitSuccess) {
          resetForm();
        }
      },
    });

    return (
      <div className={cn('form-panel', className)}>
        <h2 className="form-panel__title">{title}</h2>
        {serverError && <p className="form-panel__error">{serverError}</p>}
        <OperationForm formManager={formManager} disabled={disabled} categories={categories} />
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
