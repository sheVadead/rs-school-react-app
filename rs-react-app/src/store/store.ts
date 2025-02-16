import { configureStore } from '@reduxjs/toolkit';
import starWarsItems from '../slices/starWarsItems';
import { starWarsApi } from '../slices/api/starWarsApiSlice';

export const store = configureStore({
  reducer: {
    starWars: starWarsItems,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
