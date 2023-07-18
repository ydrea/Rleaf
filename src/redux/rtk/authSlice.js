import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    switchT: state => (state.token = true),
    switchF: state => (state.token = false),
  },
});

export const { switchT, switchF } = authSlice.actions;
export const selectSwitch = state => state.auth.token;
export default authSlice.reducer;
