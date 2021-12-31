import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'redux/counter/counterSlice';
import authenticateReducer from './reducer/authenticateSlice';
import loaderReducer from './reducer/loader';
import moviesReducer from './reducer/movieSlice';
import userHistoryReducer from './reducer/userHistory';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authenUser: authenticateReducer,
    loader: loaderReducer,
    // movie: moviesReducer,
    userHistory: userHistoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
