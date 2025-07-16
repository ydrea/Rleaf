import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { Photo } from '../../types/types'

const serverUrl = import.meta.env?.VITE_SERVER

const url = `${serverUrl}/photosrl`

export const getPhotos = createAsyncThunk<Photo[], void>('gallery/getPhotos', async () => {
  const rez = await fetch(url)
  const rezult = await rez.json()
  return rezult
})

export const getAPhoto = createAsyncThunk<Photo, void>('gallery/getAPhoto', async (id) => {
  const rez = await fetch(`${serverUrl}/photosr/${id}`)
  const rezult = await rez.json()
  return rezult
})

const initialState = {
  selectedPhotoIndex: 0,
  selectedPhoto: null,
  idX: 0,
  photos: [],
  loading: false,
  error: null,
  selectedFilters: {
    kategorije: [] as string[],
    tagovi: [] as string[]
  }
}

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    increment: (state) => {
      state.selectedPhotoIndex = Math.min(
        state.selectedPhotoIndex + 1
        // state.photos.length - 1
      )
    },
    decrement: (state) => {
      state.selectedPhotoIndex = Math.max(
        state.selectedPhotoIndex - 1
        // 0
      )
    },
    // ... other reducers

    setSelectedPhotoIndex: (state, action) => {
      state.selectedPhotoIndex = action.payload
    },
    setSelectedPhoto: (state, action) => {
      state.selectedPhoto = action.payload
    },

    setFilters: (state, action) => {
      const { kategorije, tagovi } = action.payload

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
            : []
      }
    }
  },
  extraReducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [getPhotos.pending as any]: (state: any) => {
      state.loading = true
      state.error = null
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [getPhotos.fulfilled as any]: (state: any, action: any) => {
      state.photos = action.payload
      state.loading = false
      state.error = null
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [getPhotos.rejected as any]: (state: any, action: any) => {
      state.loading = false
      state.error = action.error.message
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [getAPhoto.fulfilled as any]: (state: any, action: any) => {
      state.selectedPhoto = action.payload
    }
  }
})

export const { increment, decrement, setSelectedPhoto, setSelectedPhotoIndex, setFilters } =
  gallerySlice.actions

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectPhotos = (state: any) => state.gallery.photos as Photo[]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectSelectedPhotoIndex = (state: any) => state.gallery.selectedPhotoIndex
// ...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectAPhoto = (state: any) => {
  const selectedIdX = state.gallery.idX
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectedPhoto = state.gallery.photos.find((photo: any) => {
    const rank = parseInt(photo.rank_number)
    return rank === selectedIdX
  })
  return selectedPhoto
}
//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectSelectedPhoto = (state: any) => {
  const selectedPhotoIndex = state.gallery.selectedPhotoIndex
  const photos = state.gallery.photos

  if (selectedPhotoIndex >= 0 && selectedPhotoIndex < photos.length) {
    return photos[selectedPhotoIndex]
  }

  return null //
}

// Filteri
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectFilteredPhotos = (state: any): Photo[] => {
  console.log('selectFilteredPhotos', state)
  const { kategorije, tagovi } = state.gallery.selectedFilters || {}
  const allPhotos = state.gallery.photos

  if (!kategorije && !tagovi) {
    return allPhotos
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return allPhotos.filter((photo: any) => {
    const kategorijaMatches =
      !kategorije ||
      kategorije.length === 0 ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      kategorije.every((filter: any) => photo.kategorija && photo.kategorija.includes(filter))

    const tagoviIncluded =
      !tagovi ||
      tagovi.length === 0 ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tagovi.every((filter: any) => photo.tagovi && photo.tagovi.includes(filter))

    return kategorijaMatches && tagoviIncluded
  })
}

export default gallerySlice.reducer
