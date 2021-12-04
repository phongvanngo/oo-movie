import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FixMeLater } from 'interfaces/Migrate';
import type { RootState } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export interface UserState {
  value: FixMeLater;
}

const initialState: UserState = {
  value: null,
};

export const authenticateSlice = createSlice({
  name: 'AuthenUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<FixMeLater>) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentUser } = authenticateSlice.actions;

export const selectorUser = (state: RootState) => state.authenUser.value;

export default authenticateSlice.reducer;
