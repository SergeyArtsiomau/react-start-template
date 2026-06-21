import { combineReducers } from '@reduxjs/toolkit';
import appReducer from 'src/app/model/appSlice';
import authReducer from 'src/features/auth/model/authSlice';
import operationsReducer from 'src/entities/operation/model/operationsSlice';
import cartReducer from 'src/entities/cart/model/cartSlice';
import { signupApi } from 'src/shared/api/signupApi';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  operations: operationsReducer,
  cart: cartReducer,
  [signupApi.reducerPath]: signupApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
