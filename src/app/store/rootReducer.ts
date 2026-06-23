import { combineReducers } from '@reduxjs/toolkit';
import appReducer from 'src/app/model/appSlice';
import authReducer from 'src/features/auth/model/authSlice';
import cartReducer from 'src/entities/cart/model/cartSlice';
import { api } from 'src/shared/api/api';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  cart: cartReducer,
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
