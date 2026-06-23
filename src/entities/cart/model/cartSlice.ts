import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'src/app/store/rootReducer';

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type CartProductPayload = Omit<CartItem, 'id' | 'quantity'>;

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
    addToCart(state, action: PayloadAction<CartProductPayload>) {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId);

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push({
        ...action.payload,
        id: `${action.payload.productId}-${Date.now()}`,
        quantity: 1,
      });
    },
    incrementCartItem(state, action: PayloadAction<string>) {
      const item = state.items.find((cartItem) => cartItem.productId === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },
    decrementCartItem(state, action: PayloadAction<string>) {
      const item = state.items.find((cartItem) => cartItem.productId === action.payload);

      if (!item) {
        return;
      }

      if (item.quantity <= 1) {
        state.items = state.items.filter((cartItem) => cartItem.productId !== action.payload);
        return;
      }

      item.quantity -= 1;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, incrementCartItem, decrementCartItem, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartQuantityByProductId = (productId: string) => (state: RootState) =>
  state.cart.items.find((item) => item.productId === productId)?.quantity ?? 0;

export default cartSlice.reducer;
