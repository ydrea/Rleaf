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
  selectedPhotoIndex: 0,
  idX: 0,
  photos: [],
  loading: false,
  error: null,
  selectedFilters: [],
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    increment: state => {
      state.selectedPhotoIndex = Math.min(
        state.selectedPhotoIndex + 1
        // state.photos.length - 1
      );
    },
    decrement: state => {
      state.selectedPhotoIndex = Math.max(
        state.selectedPhotoIndex - 1
        // 0
      );
    },
    // ... other reducers

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
  // selectPhotoIndex,
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
export const selectSelectedPhoto = state => {
  const selectedPhotoIndex = state.gallery.selectedPhotoIndex;
  const photos = state.gallery.photos;

  if (selectedPhotoIndex >= 0 && selectedPhotoIndex < photos.length) {
    return photos[selectedPhotoIndex];
  }

  return null; // Return null or handle this case accordingly
};

//
export const selectFilteredPhotos = state => {
  const selectedFilters = state.gallery.selectedFilters;
  const allPhotos = state.gallery.photos;

  if (selectedFilters.length === 0) {
    return allPhotos;
  }

  // Create an array to store the filtered photos
  let filteredPhotos = [...allPhotos];

  // Filter by tags
  if (selectedFilters.includes('Tagovi')) {
    // Modify this condition based on how you store tags in your photos
    filteredPhotos = filteredPhotos.filter(photo => {
      console.log('Selected Filters:', selectedFilters);
      console.log('Photo Tagovi:', photo.tagovi);
      // Check if the photo's tag matches any of the selected filters
      return selectedFilters.includes(photo.tagovi);
    });
  }

  // Filter by categories
  if (selectedFilters.includes('KATEGORIJE')) {
    // Modify this condition based on how you store categories in your photos
    filteredPhotos = filteredPhotos.filter(photo => {
      console.log('Selected Filters:', selectedFilters);
      console.log('Photo Kategorije:', photo.kategorije);
      // Check if the photo's category matches any of the selected filters
      return selectedFilters.includes(photo.kategorije);
    });
  }

  console.log('Filtered Photos:', filteredPhotos);

  return filteredPhotos;
};

export default gallerySlice.reducer;
