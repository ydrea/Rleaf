import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './rtk/mapSlice';
import galleryReducer from './rtk/gallerySlice';
import authReducer from './rtk/authSlice';

//
export const store = configureStore({
  reducer: {
    galery: galleryReducer,
    mapa: mapReducer,
    auth: authReducer,
  },
  //   middleware: getDefaultMiddleware =>
  //     getDefaultMiddleware().concat(gallerySlice.middleware),
});
