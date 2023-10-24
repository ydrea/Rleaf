// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const MAP_URL = 'https://landscape.agr.hr/qgis/';

// const wfs1 =
//   'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&outputFormat=application/json&srsName=epsg:4326&TYPENAME=fiksno_granice_banije';
// 'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&outputFormat=application/json&srsName=epsg:4326&TYPENAME=naselja_stanovnistvo'

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedImg: null,
  selectedMarker: null,
};

const mapSlice = createSlice({
  name: 'mapSlice',
  initialState,
  reducers: {
    setSelectedPhoto: (state, action) => {
      state.selectedImg = action.payload;
    },
    setSelectedMarker: (state, action) => {
      state.selectedMarker = action.payload;
    },
  },
});

export const { setSelectedPhoto, setSelectedMarker } =
  mapSlice.actions;

export const selectSelectedPhoto = state => state.mapa.selectedImg;
export const selectSelectedMarker = state =>
  state.mapa.selectedMarker;

export default mapSlice.reducer;
