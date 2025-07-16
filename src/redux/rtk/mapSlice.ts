import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import type { Photo } from '../../types/types'

const initialState = {
  selectedImg: null as Photo | null,
  selectedMarker: null as Photo | null
}

const mapSlice = createSlice({
  name: 'mapslice',
  initialState,
  reducers: {
    setSelectedPhoto: (state, action) => {
      state.selectedImg = action.payload
    },
    setSelectedMarker: (state, action) => {
      state.selectedMarker = action.payload
    }
  }
})

export const { setSelectedPhoto, setSelectedMarker } = mapSlice.actions

export const selectSelectedPhoto = (state: RootState) => state.mapa.selectedImg

export const selectSelectedMarker = (state: RootState) => state.mapa.selectedMarker

export default mapSlice.reducer
