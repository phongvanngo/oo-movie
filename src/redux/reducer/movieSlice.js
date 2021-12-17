import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import * as client from 'api/oomovie';

const initialState = {
  tags: [],
};

export const getMovies = createAsyncThunk(
  'movies',
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    let url = 'movies';
    let response;
    try {
      response = await client.get(url, payload);

      if (response.status === 200) {
        console.log('Hello movie ne', response.data.data);
        dispatch(setMovies(response.data));
      }
    } catch (error) {
      console.log('Loi roi', error);
    }
  }
);

export const createTag = createAsyncThunk(
  'tag/create',
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    let url = 'tag/create';

    let response;
    try {
      response = await client.post(url, payload);
      if (response.status == 200) {
        dispatch(getMovies());
      }
    } catch (error) {}
  }
);

export const deleteTag = createAsyncThunk(
  'tag/delete',
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    let url = `tag/${payload}`;
    let response;
    try {
      response = await client.deleteItem(url, payload);
      if (response.status == 200) {
        dispatch(getMovies());
      }
    } catch (error) {}
  }
);

export const editTag = createAsyncThunk(
  'tag/modify',
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    let url = `tag/${payload.id}`;

    let response;
    try {
      response = await client.patch(url, payload.data);
      if (response.status === 200) {
        dispatch(getMovies());
      }
    } catch (error) {}
  }
);

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const { setMovies } = movieSlice.actions;

export const selectorMovies = (state) => state.movie.value;
