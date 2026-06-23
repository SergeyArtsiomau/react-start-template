import React, { memo } from 'react';
import cn from 'clsx';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import type { OperationFormProps } from './types';

export const OperationForm = memo<OperationFormProps>(
  ({ className, formManager, formElement, disabled, categories = [] }) => {
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange, setFieldValue } = formManager;

    const nameValidation = getValidates(errors.name, touched.name, submitCount);
    const amountValidation = getValidates(errors.amount, touched.amount, submitCount);
    const categoryValidation = getValidates(errors.categoryId, touched.categoryId, submitCount);
    const descriptionValidation = getValidates(errors.description, touched.description, submitCount);

    return (
      <form ref={formElement} onSubmit={handleSubmit} className={cn(className)}>
        <FormItem title="Название" required validateStatus={nameValidation.validateStatus} help={nameValidation.help}>
          <input
            disabled={disabled}
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Покупка в супермаркете"
          />
        </FormItem>

        <FormItem title="Тип" required validateStatus="" help="">
          <select disabled={disabled} name="type" value={values.type} onChange={handleChange} onBlur={handleBlur}>
            <option value="Cost">Расход</option>
            <option value="Profit">Доход</option>
          </select>
        </FormItem>

        <FormItem title="Сумма" required validateStatus={amountValidation.validateStatus} help={amountValidation.help}>
          <input
            disabled={disabled}
            name="amount"
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="1250"
          />
        </FormItem>

        <FormItem
          title="Категория"
          required
          validateStatus={categoryValidation.validateStatus}
          help={categoryValidation.help}
        >
          <select
            disabled={disabled || categories.length === 0}
            name="categoryId"
            value={values.categoryId}
            onChange={(event) => setFieldValue('categoryId', event.target.value)}
            onBlur={handleBlur}
          >
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </FormItem>

        <FormItem
          title="Описание"
          validateStatus={descriptionValidation.validateStatus}
          help={descriptionValidation.help}
        >
          <textarea
            disabled={disabled}
            name="description"
            rows={3}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Комментарий к операции"
          />
        </FormItem>
      </form>
    );
  }
);

OperationForm.displayName = 'OperationForm';
