import galleryReducer from './rtk/gallerySlice';
import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './rtk/mapSlice';

export const store = configureStore({
  reducer: {
    galery: galleryReducer,
    mapa: mapReducer,
  },
  //   middleware: getDefaultMiddleware =>
  //     getDefaultMiddleware().concat(gallerySlice.middleware),
});
