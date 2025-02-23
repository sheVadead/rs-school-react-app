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

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
