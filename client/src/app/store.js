import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../features/post/postSlice';
import { apiSlice } from '../features/api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer:{
    [apiSlice.reducerPath]: apiSlice.reducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch);

