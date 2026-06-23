import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'src/app/store/rootReducer';

type AppState = {
  initialized: boolean;
};

const initialState: AppState = {
  initialized: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized(state) {
      state.initialized = true;
    },
  },
});

export const { setInitialized } = appSlice.actions;
export const selectIsInitialized = (state: RootState) => state.app.initialized;
export default appSlice.reducer;
