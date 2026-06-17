import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'src/app/store/rootReducer';

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: string;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'id'>>) {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId);

      if (existingItem) {
        return;
      }

      state.items.push({
        ...action.payload,
        id: `${action.payload.productId}-${Date.now()}`,
      });
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
