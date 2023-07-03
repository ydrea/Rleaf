import galleryReducer from './rtk/gallerySlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    galery: galleryReducer,
  },
  //   middleware: getDefaultMiddleware =>
  //     getDefaultMiddleware().concat(gallerySlice.middleware),
});
