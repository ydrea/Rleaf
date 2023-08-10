import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = `${process.env.REACT_APP_SERVER}/photosr`;

export const getPhotos = createAsyncThunk(
  'gallery/getPhotos',
  async () => {
    const rez = await fetch(url);
    const rezult = await rez.json();
    return rezult;
  }
);

export const getAPhoto = createAsyncThunk(
  'gallery/getAPhoto',
  async id => {
    const rez = await fetch(
      `${process.env.REACT_APP_SERVER}/photosr/${id}`
    );
    const rezult = await rez.json();
    return rezult;
  }
);

const initialState = {
  selectedPhotoIndex: 0,
  idX: 2,
  photos: [],
  loading: false,
  error: null,
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    increment: state => {
      state.selectedPhotoIndex = Math.min(
        state.selectedPhotoIndex + 1,
        state.photos.length - 1
      );
    },
    decrement: state => {
      state.selectedPhotoIndex = Math.max(
        state.selectedPhotoIndex - 1,
        0
      );
    },
    selectPhotoIndex: (state, action) => {
      state.selectedPhotoIndex = action.payload;
    },
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
    [getAPhoto.fulfilled]: (state, action) => {},
  },
});

export const { increment, decrement, selectPhotoIndex } =
  gallerySlice.actions;

export const selectPhotos = state => state.gallery.photos;
export const selectSelectedPhotoIndex = state =>
  state.gallery.selectedPhotoIndex;
// ...
export const selectAPhoto = state => {
  const selectedIdX = state.gallery.idX;
  const selectedPhoto = state.gallery.photos.find(photo => {
    const rank = parseInt(photo.rank_number);
    return rank === selectedIdX;
  });

  return selectedPhoto;
};

// ...

export default gallerySlice.reducer;
