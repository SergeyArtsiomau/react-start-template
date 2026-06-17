import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  OperationFormPanel,
  EMPTY_OPERATION_FORM_VALUES,
  type OperationFormValues,
} from 'src/features/forms/OperationForm';
import { mapOperationToFormValues, useOperations } from 'src/entities/operation';
import { ROUTES } from 'src/shared/config/routes';
import { Modal } from 'src/shared/modal/Modal';
import './operation-modal.css';

export function OperationModal() {
  const navigate = useNavigate();
  const { operationId } = useParams();
  const { getOperation, addOperation, updateOperation } = useOperations();
  const isCreateMode = !operationId;
  const operation = operationId ? getOperation(operationId) : undefined;

  useEffect(() => {
    if (!isCreateMode && !operation) {
      navigate(ROUTES.OPERATIONS, { replace: true });
    }
  }, [isCreateMode, navigate, operation]);

  const handleClose = () => {
    navigate(ROUTES.OPERATIONS);
  };

  if (!isCreateMode && !operation) {
    return null;
  }

  const initialValues = operation ? mapOperationToFormValues(operation) : EMPTY_OPERATION_FORM_VALUES;

  const handleSubmitSuccess = (values: OperationFormValues) => {
    if (isCreateMode) {
      addOperation(values);
    } else if (operationId) {
      updateOperation(operationId, values);
    }

    handleClose();
  };

  return (
    <Modal visible onClose={handleClose}>
      <OperationFormPanel
        className="operation-modal__form"
        title={isCreateMode ? 'Новая операция' : 'Редактирование операции'}
        submitLabel={isCreateMode ? 'Создать операцию' : 'Сохранить изменения'}
        initialValues={initialValues}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </Modal>
  );
}
