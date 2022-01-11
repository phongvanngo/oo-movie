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

export const userFromAPISlice = createSlice({
  name: 'userFromAPI',
  initialState,
  reducers: {
    setUserFromAPI: (state, action: PayloadAction<FixMeLater>) => {
      state.value = action.payload;
    },
  },
});

export const { setUserFromAPI } = userFromAPISlice.actions;

export const selectorUser = (state: RootState) => state.userFromApi.value;

export default userFromAPISlice.reducer;
