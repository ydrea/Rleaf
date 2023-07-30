import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const MAP_URL = 'https://landscape.agr.hr/qgis/';

const wfs1 =
  'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&outputFormat=application/json&srsName=epsg:4326&TYPENAME=fiksno_granice_banije';
// 'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&outputFormat=application/json&srsName=epsg:4326&TYPENAME=naselja_stanovnistvo'

const initialState = {
  maps: [],
  status: 'idle',
  error: null,
};

export const fetchMap1 = createAsyncThunk('map1', async () => {
  const res = await axios.get(wfs1);
  console.log(res);
  return res.data;
});

export const mapSlice = createSlice({
  name: 'mapa',
  initialState,
  reducers: {
    addEm(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers: {
    [fetchMap1.pending]: (state, action) => {
      state.status = 'pending';
    },
    [fetchMap1.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.maps = action.payload;
    },
    [fetchMap1.rejected]: (state, action) => {
      state.status = 'reject';
      state.error = action.error.message;
    },
  },
});

export const selectEm = state => state.mapa.maps;
export const selectStatus = state => state.mapa.status;
export const selectError = state => state.mapa.error;

export const { addEm } = mapSlice.actions;

export default mapSlice.reducer;
