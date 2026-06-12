import React, { memo } from 'react';
import cn from 'clsx';
import './form-item.css';

export type Help = null | React.ReactNode;
export type ValidateStatus = 'error' | '';

export type FormItemProps = {
  className?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  validateStatus: ValidateStatus;
  help: Help;
  required?: boolean;
};

export const FormItem = memo<FormItemProps>(({ validateStatus, required, help, className, title, children }) => (
  <div className={cn('form-item', validateStatus === 'error' && 'form-item--error', className)}>
    <label className={cn('form-item__title', required && 'form-item__title--required')}>{title}</label>
    <div className="form-item__control">{children}</div>
    {help && <div className="form-item__help">{help}</div>}
  </div>
));

FormItem.displayName = 'FormItem';
