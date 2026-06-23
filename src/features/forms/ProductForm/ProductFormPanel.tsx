import React, { memo } from 'react';
import cn from 'clsx';
import { useFormik } from 'formik';
import { ProductForm } from './ProductForm';
import type { ProductFormValues } from './types';
import { EMPTY_PRODUCT_FORM_VALUES } from './types';
import { validateProductForm } from './validateProductForm';
import '../forms.css';

export type ProductFormPanelProps = {
  className?: string;
  disabled?: boolean;
  title?: string;
  submitLabel?: string;
  initialValues?: ProductFormValues;
  categories?: Array<{ id: string; name: string }>;
  serverError?: string | null;
  onSubmitSuccess?: (values: ProductFormValues) => void;
};

export const ProductFormPanel = memo<ProductFormPanelProps>(
  ({
    className,
    disabled,
    title = 'Товар',
    submitLabel = 'Сохранить товар',
    initialValues = EMPTY_PRODUCT_FORM_VALUES,
    categories = [],
    serverError,
    onSubmitSuccess,
  }) => {
    const formManager = useFormik<ProductFormValues>({
      initialValues,
      enableReinitialize: true,
      validate: validateProductForm,
      onSubmit: (values) => {
        onSubmitSuccess?.(values);
      },
    });

    return (
      <div className={cn('form-panel', className)}>
        <h2 className="form-panel__title">{title}</h2>
        {serverError && <p className="form-panel__error">{serverError}</p>}
        <ProductForm formManager={formManager} disabled={disabled} categories={categories} />
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

ProductFormPanel.displayName = 'ProductFormPanel';
