import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getPhotos = createAsyncThunk('getphotos', async () => {
  const rez = await fetch(
    // 'https://picsum.photos/v2/list?page=2&limit=6'
    'http://localhost:3500/photos/'
  );
  const rezult = await rez.json();
  console.log(rezult);
  return rezult;
});
//
export const getAPhoto = createAsyncThunk('getaphoto', async () => {
  const rez = await fetch('http://localhost:3500/photos:id');
  const rezult = await rez.json();
  console.log(rezult);
  return rezult;
});
//
const initialState = {
  idX: 2,
  photos: [],
  loading: false,
  error: null,
};

export const gallerySlice = createSlice({
  name: 'galery',
  initialState,
  reducers: {
    increment: state => (state.idX += 1),
    decrement: state => (state.idX -= 1),
  },
  extraReducers: {
    [getPhotos.pending]: state => {
      state.loading = true;
    },
    [getPhotos.fulfilled]: (state, action) => {
      state.photos = action.payload;
      state.loading = false;
    },

    [getPhotos.rejected]: (state, action) => {
      state.status = 'reject';
      state.error = action.error.message;
    },
  },
});

export const { increment, decrement } = gallerySlice.actions;

export const selectPhotos = state => state.galery.photos;
export const selectidX = state => state.galery.idX;

export default gallerySlice.reducer;

//
