import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = `${process.env.REACT_APP_SERVER}/photosr`;

console.log('====================================');
console.log(url);
console.log('====================================');
export const getPhotos = createAsyncThunk(
  'getphotos+rank',
  async () => {
    const rez = await fetch(url);
    const rezult = await rez.json();
    console.log('listaR', rezult);
    return rezult;
  }
);
//
export const getAPhoto = createAsyncThunk(
  'getaphoto+rank',
  async id => {
    const rez = await fetch(
      `${process.env.REACT_APP_SERVER}/photosr/${id}`
    );
    const rezult = await rez.json();
    console.log('oneR', rezult);
    return rezult;
  }
);
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
    increment: state => {
      state.idX += 1;
    },
    decrement: state => {
      state.idX -= 1;
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
  },
});

export const { increment, decrement } = gallerySlice.actions;

export const selectPhotos = state => state.galery.photos;

//
export const selectAPhoto = state => {
  console.log('Current idX:', state.galery.idX);
  const selectedIdX = state.galery.idX;
  const selectedPhoto = state.galery.photos.find(photo => {
    const rank = parseInt(photo.rank_number);
    return rank === selectedIdX;
  });

  console.log('Selected photo:', selectedPhoto);
  return selectedPhoto;
};

export const selectidX = state => state.galery.idX;

export default gallerySlice.reducer;

//
