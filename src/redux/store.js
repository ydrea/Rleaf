import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './rtk/mapSlice';
import galleryReducer from './rtk/gallerySlice';

//
export const store = configureStore({
  reducer: {
    galery: galleryReducer,
    mapa: mapReducer,
  },
  //   middleware: getDefaultMiddleware =>
  //     getDefaultMiddleware().concat(gallerySlice.middleware),
});
