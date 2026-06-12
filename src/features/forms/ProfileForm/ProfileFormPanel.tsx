import React, { memo } from 'react';
import cn from 'clsx';
import { useFormik } from 'formik';
import { ProfileForm } from './ProfileForm';
import type { ProfileFormValues } from './types';
import { validateProfileForm } from './validateProfileForm';
import '../forms.css';

export type ProfileFormPanelProps = {
  className?: string;
  disabled?: boolean;
  initialValues?: ProfileFormValues;
  onSubmitSuccess?: (values: ProfileFormValues) => void;
};

const defaultValues: ProfileFormValues = {
  name: '',
  about: '',
};

export const ProfileFormPanel = memo<ProfileFormPanelProps>(
  ({ className, disabled, initialValues = defaultValues, onSubmitSuccess }) => {
    const formManager = useFormik<ProfileFormValues>({
      initialValues,
      enableReinitialize: true,
      validate: validateProfileForm,
      onSubmit: (values, { resetForm }) => {
        console.log('ProfileForm submit:', values);
        onSubmitSuccess?.(values);
        resetForm();
      },
    });

    return (
      <div className={cn('form-panel', className)}>
        <h2 className="form-panel__title">Профиль</h2>
        <ProfileForm formManager={formManager} disabled={disabled} />
        <button
          type="button"
          className="form-panel__submit"
          disabled={disabled}
          onClick={() => formManager.submitForm()}
        >
          Сохранить
        </button>
      </div>
    );
  }
);

ProfileFormPanel.displayName = 'ProfileFormPanel';
