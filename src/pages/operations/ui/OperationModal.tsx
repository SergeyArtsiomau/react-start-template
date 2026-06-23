import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  OperationFormPanel,
  EMPTY_OPERATION_FORM_VALUES,
  type OperationFormValues,
} from 'src/features/forms/OperationForm';
import { useCreateOperationMutation, useGetOperationByIdQuery, useUpdateOperationMutation } from 'src/shared/api/api';
import { useEnsureCategories } from 'src/shared/api/useEnsureCategories';
import {
  getCategoryId,
  mapOperationFormToCreateBody,
  mapOperationFormToUpdateBody,
  mapServerOperationToFormValues,
} from 'src/shared/api/mappers';
import { getFirstServerError } from 'src/shared/api/parseServerErrors';
import type { ParsedServerErrors } from 'src/shared/api/types';
import { ROUTES } from 'src/shared/config/routes';
import { Modal } from 'src/shared/modal/Modal';
import './operation-modal.css';

export function OperationModal() {
  const navigate = useNavigate();
  const { operationId } = useParams();
  const isCreateMode = !operationId;
  const [serverError, setServerError] = useState<string | null>(null);
  const categories = useEnsureCategories();
  const { data: operation, isError } = useGetOperationByIdQuery(operationId ?? '', {
    skip: isCreateMode,
  });
  const [createOperation, { isLoading: isCreating }] = useCreateOperationMutation();
  const [updateOperation, { isLoading: isUpdating }] = useUpdateOperationMutation();

  useEffect(() => {
    if (!isCreateMode && isError) {
      navigate(ROUTES.OPERATIONS, { replace: true });
    }
  }, [isCreateMode, isError, navigate]);

  const handleClose = () => {
    navigate(ROUTES.OPERATIONS);
  };

  if (!isCreateMode && !operation) {
    return null;
  }

  const initialValues = operation
    ? mapServerOperationToFormValues(operation)
    : {
        ...EMPTY_OPERATION_FORM_VALUES,
        categoryId: categories[0]?.id ?? '',
      };

  const handleSubmitSuccess = async (values: OperationFormValues) => {
    setServerError(null);
    const categoryId = getCategoryId(values, categories);

    try {
      if (isCreateMode) {
        await createOperation(mapOperationFormToCreateBody(values, categoryId)).unwrap();
      } else if (operationId) {
        await updateOperation({
          id: operationId,
          body: mapOperationFormToUpdateBody(values, categoryId),
        }).unwrap();
      }

      handleClose();
    } catch (error) {
      const parsed = (error as { data?: ParsedServerErrors })?.data;
      setServerError(
        getFirstServerError(parsed ?? { general: ['Ошибка сохранения операции'], email: [], password: [] })
      );
    }
  };

  return (
    <Modal visible onClose={handleClose}>
      <OperationFormPanel
        className="operation-modal__form"
        title={isCreateMode ? 'Новая операция' : 'Редактирование операции'}
        submitLabel={isCreateMode ? 'Создать операцию' : 'Сохранить изменения'}
        initialValues={initialValues}
        categories={categories}
        serverError={serverError}
        disabled={isCreating || isUpdating}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </Modal>
  );
}
