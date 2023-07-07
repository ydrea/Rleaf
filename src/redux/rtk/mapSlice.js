import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  maps: [],
  loading: false,
  error: null,
};

export const mapSlice = createSlice({
  name: 'mapa',
  initialState,
  reducers: {
    addEm(state, action) {
      state.push(action.payload);
    },
  },
});

export const selectEm = state => state.mapa.maps;

export const { addEm } = mapSlice.actions;

export default mapSlice.reducer;
