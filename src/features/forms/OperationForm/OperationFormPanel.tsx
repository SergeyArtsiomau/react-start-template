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
  onSubmitSuccess?: (values: OperationFormValues) => void;
};

const defaultValues = EMPTY_OPERATION_FORM_VALUES;

export const OperationFormPanel = memo<OperationFormPanelProps>(
  ({
    className,
    disabled,
    title = 'Операция',
    submitLabel = 'Сохранить операцию',
    initialValues = defaultValues,
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
