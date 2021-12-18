import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FixMeLater } from 'interfaces/Migrate';
import type { RootState } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`

const initialState: any = {
  value: {},
};

export const userHistory = createSlice({
  name: 'User History',
  initialState,
  reducers: {
    updateUserHistory: (state, action: PayloadAction<FixMeLater>) => {
      state.value = action.payload;

      //   Xu ly phan local storage
      const userEmail = action.payload?.email;
      console.log(userEmail);
      localStorage.setItem(`${userEmail}`, JSON.stringify(action.payload));
    },
  },
});

export const { updateUserHistory } = userHistory.actions;

export const selectorUserHistory = (state: RootState) =>
  state.userHistory.value;

export default userHistory.reducer;
