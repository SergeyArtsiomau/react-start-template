import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OperationFormValues } from 'src/features/forms/OperationForm';
import { createOperationId } from 'src/entities/operation/lib/createOperationId';
import { MOCK_OPERATIONS } from 'src/entities/operation/model/mockOperations';
import type { Operation } from 'src/entities/operation/model/types';

type OperationsState = {
  items: Operation[];
};

const formatOperationDate = (date: Date): string =>
  date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

const createOperation = (values: OperationFormValues): Operation => ({
  id: createOperationId(),
  ...values,
  date: formatOperationDate(new Date()),
});

const initialState: OperationsState = {
  items: MOCK_OPERATIONS,
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    addOperation(state, action: PayloadAction<OperationFormValues>) {
      state.items.unshift(createOperation(action.payload));
    },
    updateOperation(state, action: PayloadAction<{ id: string; values: OperationFormValues }>) {
      const index = state.items.findIndex((operation) => operation.id === action.payload.id);

      if (index === -1) {
        return;
      }

      state.items[index] = {
        ...state.items[index],
        ...action.payload.values,
      };
    },
  },
});

export const { addOperation, updateOperation } = operationsSlice.actions;

export default operationsSlice.reducer;
