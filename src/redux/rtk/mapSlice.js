import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  maps: [],
  loading: false,
  error: null,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    increment: state => (state.photos += 1),
    decrement: state => (state.photos -= 1),
  },
});

export const { increment, decrement } = mapSlice.actions;

export default mapSlice.reducer;
