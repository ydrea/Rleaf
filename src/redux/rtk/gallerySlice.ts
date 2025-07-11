import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = `${process.env.REACT_APP_SERVER}/photosrl`;

export const getPhotos = createAsyncThunk('gallery/getPhotos', async () => {
  const rez = await fetch(url);
  const rezult = await rez.json();
  // console.log(rezult);
  return rezult;
}) as unknown as any;

export const getAPhoto = createAsyncThunk('gallery/getAPhoto', async (id) => {
  const rez = await fetch(`${process.env.REACT_APP_SERVER}/photosr/${id}`);
  const rezult = await rez.json();
  return rezult;
});

const initialState = {
  selectedPhotoIndex: 0,
  selectedPhoto: null,
  idX: 0,
  photos: [],
  loading: false,
  error: null,
  selectedFilters: {
    kategorije: [] as string[],
    tagovi: [] as string[],
  },
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    increment: (state) => {
      state.selectedPhotoIndex = Math.min(
        state.selectedPhotoIndex + 1
        // state.photos.length - 1
      );
    },
    decrement: (state) => {
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
    //v min
    // setFilters: (state, action) => {
    // 	const { kategorije, tagovi } = action.payload;

    // 	state.selectedFilters = {
    // 		kategorije: Array.isArray(kategorije) ? kategorije.filter(Boolean) : [],
    // 		tagovi: Array.isArray(tagovi) ? tagovi.filter(Boolean) : [],
    // 	};
    // },
    // v max
    setFilters: (state, action) => {
      const { kategorije, tagovi } = action.payload;

      state.selectedFilters = {
        kategorije: Array.isArray(kategorije)
          ? kategorije.filter(Boolean)
          : Array.isArray(state.selectedFilters.kategorije)
          ? state.selectedFilters.kategorije
          : [],
        tagovi: Array.isArray(tagovi)
          ? tagovi.filter(Boolean)
          : Array.isArray(state.selectedFilters.tagovi)
          ? state.selectedFilters.tagovi
          : [],
      };
    },
    //v mid
    // setFilters: (state, action) => {
    // 	const { kategorije, tagovi } = action.payload;

    // 	console.log('kategorije:', kategorije);
    // 	console.log('tagovi:', tagovi);

    // 	state.selectedFilters = {
    // 		kategorije: Array.isArray(kategorije)
    // 			? kategorije
    // 			: (Array.isArray(state.selectedFilters.kategorije)
    // 					? [...state.selectedFilters.kategorije, kategorije]
    // 					: [kategorije]
    // 			  ).filter(Boolean),
    // 		tagovi: Array.isArray(tagovi)
    // 			? tagovi
    // 			: (Array.isArray(state.selectedFilters.tagovi)
    // 					? [...state.selectedFilters.tagovi, tagovi]
    // 					: [tagovi]
    // 			  ).filter(Boolean),
    // 	};
    // },
  },
  extraReducers: {
    [getPhotos.pending as any]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [getPhotos.fulfilled as any]: (state: any, action: any) => {
      state.photos = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getPhotos.rejected as any]: (state: any, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getAPhoto.fulfilled as any]: (state: any, action: any) => {
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

export const selectPhotos = (state: any) => state.gallery.photos;
export const selectSelectedPhotoIndex = (state: any) =>
  state.gallery.selectedPhotoIndex;
// ...
export const selectAPhoto = (state: any) => {
  const selectedIdX = state.gallery.idX;
  const selectedPhoto = state.gallery.photos.find((photo: any) => {
    const rank = parseInt(photo.rank_number);
    return rank === selectedIdX;
  });
  return selectedPhoto;
};
//
export const selectSelectedPhoto = (state: any) => {
  const selectedPhotoIndex = state.gallery.selectedPhotoIndex;
  const photos = state.gallery.photos;

  if (selectedPhotoIndex >= 0 && selectedPhotoIndex < photos.length) {
    return photos[selectedPhotoIndex];
  }

  return null; //
};

// Filteri
export const selectFilteredPhotos = (state: any) => {
  console.log('selectFilteredPhotos', state);
  const { kategorije, tagovi } = state.gallery.selectedFilters || {};
  const allPhotos = state.gallery.photos;

  if (!kategorije && !tagovi) {
    return allPhotos;
  }

  return allPhotos.filter((photo: any) => {
    const kategorijaMatches =
      !kategorije ||
      kategorije.length === 0 ||
      kategorije.every(
        (filter: any) => photo.kategorija && photo.kategorija.includes(filter)
      );

    const tagoviIncluded =
      !tagovi ||
      tagovi.length === 0 ||
      tagovi.every(
        (filter: any) => photo.tagovi && photo.tagovi.includes(filter)
      );

    return kategorijaMatches && tagoviIncluded;
  });
};

export default gallerySlice.reducer;
