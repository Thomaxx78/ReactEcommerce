// store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { articleAPI, commentAPI } from './Services/API';

export const store = configureStore({
  reducer: {
    [articleAPI.reducerPath]: articleAPI.reducer,
    [commentAPI.reducerPath]: commentAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleAPI.middleware, commentAPI.middleware),
});

setupListeners(store.dispatch);
