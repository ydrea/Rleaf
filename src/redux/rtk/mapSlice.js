// mapSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMarkerCoords: null,
  selectedMarkerPopUp: null,
  markerClusterRef: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setSelectedMarker: (state, action) => {
      state.selectedMarkerCoords = action.payload.coords;
      state.selectedMarkerPopUp = action.payload.popUp;
    },
    clearSelectedMarker: state => {
      state.selectedMarkerCoords = null;
      state.selectedMarkerPopUp = null;
    },

    setMarkerClusterRef: (state, action) => {
      state.markerClusterRef = action.payload;
    },
  },
});

export const {
  setSelectedMarker,
  clearSelectedMarker,
  setMarkerClusterRef,
} = mapSlice.actions;

export const selectSelectedMarkerCoords = state =>
  state.map.selectedMarkerCoords;
export const selectSelectedMarkerPopUp = state =>
  state.map.selectedMarkerPopUp;

export default mapSlice.reducer;
