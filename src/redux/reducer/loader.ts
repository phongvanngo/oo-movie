import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FixMeLater } from 'interfaces/Migrate';
import type { RootState } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`

const initialState: any = {
  value: true,
};

export const loaderSlice = createSlice({
  name: 'Loader',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<FixMeLater>) => {
      state.value = action.payload;
    },
  },
});

export const { setLoading } = loaderSlice.actions;

export const selectorLoader = (state: RootState) => state.loader.value;

export default loaderSlice.reducer;
