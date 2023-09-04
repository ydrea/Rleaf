import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = `${process.env.REACT_APP_SERVER}/photosr`;

export const getPhotos = createAsyncThunk(
  'gallery/getPhotos',
  async () => {
    const rez = await fetch(url);
    const rezult = await rez.json();
    console.log(rezult);
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
  selectedPhotoIndex: -1,
  idX: 0,
  photos: [],
  loading: false,
  error: null,
  selectedFilters: [],
};

// ... (imports and initialState remain the same)

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
    setSelectedPhotoIndex: (state, action) => {
      state.selectedPhotoIndex = action.payload;
    },
    setSelectedPhoto: (state, action) => {
      state.selectedPhoto = action.payload;
    },
    setFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
  },
  extraReducers: {
    [getPhotos.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getPhotos.fulfilled]: (state, action) => {
      state.photos = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getPhotos.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getAPhoto.fulfilled]: (state, action) => {
      state.selectedPhoto = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  selectPhotoIndex,
  setSelectedPhoto,
  setSelectedPhotoIndex,
  setFilters,
} = gallerySlice.actions;

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

//
export const selectFilteredPhotos = state => {
  const selectedFilters = state.gallery.selectedFilters;
  const allPhotos = state.gallery.photos;

  if (selectedFilters.length === 0) {
    return allPhotos;
  }

  return allPhotos.filter(
    photo =>
      selectedFilters.includes(photo.tagovi) ||
      selectedFilters.includes(photo.kategorije)
  );
};

export default gallerySlice.reducer;
