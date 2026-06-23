import React, { memo } from 'react';
import cn from 'clsx';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import type { ProductFormProps } from './types';

export const ProductForm = memo<ProductFormProps>(
  ({ className, formManager, formElement, disabled, categories = [] }) => {
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange, setFieldValue } = formManager;

    const nameValidation = getValidates(errors.name, touched.name, submitCount);
    const priceValidation = getValidates(errors.price, touched.price, submitCount);
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
            placeholder="Ноутбук"
          />
        </FormItem>

        <FormItem title="Цена" required validateStatus={priceValidation.validateStatus} help={priceValidation.help}>
          <input
            disabled={disabled}
            name="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="2490"
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

        <FormItem title="Фото (URL)" validateStatus="" help="">
          <input
            disabled={disabled}
            name="image"
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://..."
          />
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
            placeholder="Описание товара"
          />
        </FormItem>
      </form>
    );
  }
);

ProductForm.displayName = 'ProductForm';
