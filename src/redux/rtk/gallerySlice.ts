import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { Photo } from '../../types/types'
import type { RootState } from '../store'

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
  photos: [] as Photo[],
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

export const selectPhotos = (state: RootState) => state.gallery.photos

export const selectSelectedPhotoIndex = (state: RootState) => state.gallery.selectedPhotoIndex

export const selectAPhoto = (state: RootState) => {
  const selectedIdX = state.gallery.idX
  const selectedPhoto = state.gallery.photos.find((photo: Photo) => {
    const rank = parseInt(photo.rank_number ?? '0')
    return rank === selectedIdX
  })

  return selectedPhoto
}

export const selectSelectedPhoto = (state: RootState) => {
  const selectedPhotoIndex = state.gallery.selectedPhotoIndex
  const photos = state.gallery.photos

  if (selectedPhotoIndex >= 0 && selectedPhotoIndex < photos.length) {
    return photos[selectedPhotoIndex]
  }

  return null
}

// Filteri
export const selectFilteredPhotos = (state: RootState): Photo[] => {
  console.log('selectFilteredPhotos', state)
  const { kategorije, tagovi } = state.gallery.selectedFilters || {}
  const allPhotos = state.gallery.photos

  if (!kategorije && !tagovi) {
    return allPhotos
  }

  return allPhotos.filter((photo: Photo) => {
    const kategorijaMatches =
      !kategorije ||
      kategorije.length === 0 ||
      kategorije.every((filter: string) => photo.kategorija && photo.kategorija.includes(filter))

    const tagoviIncluded =
      !tagovi ||
      tagovi.length === 0 ||
      tagovi.every((filter: string) => photo.tagovi && photo.tagovi.includes(filter))

    return kategorijaMatches && tagoviIncluded
  })
}

export default gallerySlice.reducer
