import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductFormPanel, EMPTY_PRODUCT_FORM_VALUES, type ProductFormValues } from 'src/features/forms/ProductForm';
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from 'src/shared/api/api';
import { useEnsureCategories } from 'src/shared/api/useEnsureCategories';
import { getCategoryId, mapProductFormToBody, mapServerProductToFormValues } from 'src/shared/api/mappers';
import { getFirstServerError } from 'src/shared/api/parseServerErrors';
import type { ParsedServerErrors } from 'src/shared/api/types';
import { ROUTES } from 'src/shared/config/routes';
import { Modal } from 'src/shared/modal/Modal';
import 'src/pages/operations/ui/operation-modal.css';

export function ProductModal() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const isCreateMode = !productId;
  const [serverError, setServerError] = useState<string | null>(null);
  const categories = useEnsureCategories();
  const { data: product, isError } = useGetProductByIdQuery(productId ?? '', {
    skip: isCreateMode,
  });
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (!isCreateMode && isError) {
      navigate(ROUTES.PRODUCTS, { replace: true });
    }
  }, [isCreateMode, isError, navigate]);

  const handleClose = () => {
    navigate(ROUTES.PRODUCTS);
  };

  if (!isCreateMode && !product) {
    return null;
  }

  const initialValues = product
    ? mapServerProductToFormValues(product)
    : {
        ...EMPTY_PRODUCT_FORM_VALUES,
        categoryId: categories[0]?.id ?? '',
      };

  const handleSubmitSuccess = async (values: ProductFormValues) => {
    setServerError(null);
    const categoryId = getCategoryId(values, categories);
    const body = mapProductFormToBody(values, categoryId);

    try {
      if (isCreateMode) {
        await createProduct(body).unwrap();
      } else if (productId) {
        await updateProduct({ id: productId, body }).unwrap();
      }

      handleClose();
    } catch (error) {
      const parsed = (error as { data?: ParsedServerErrors })?.data;
      setServerError(getFirstServerError(parsed ?? { general: ['Ошибка сохранения товара'], email: [], password: [] }));
    }
  };

  return (
    <Modal visible onClose={handleClose}>
      <ProductFormPanel
        className="operation-modal__form"
        title={isCreateMode ? 'Новый товар' : 'Редактирование товара'}
        submitLabel={isCreateMode ? 'Создать товар' : 'Сохранить изменения'}
        initialValues={initialValues}
        categories={categories}
        serverError={serverError}
        disabled={isCreating || isUpdating}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </Modal>
  );
}
