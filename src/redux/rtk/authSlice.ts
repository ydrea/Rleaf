import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  password: string;
  authorized: boolean;
}

const initialState: AuthState = {
  password: '',
  authorized: false,
};

export const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // setUsername: (state, action) => {
    //   const value = action.payload;
    //   state.username = value; // action.payload.username
    // },
    // setPassword: (state, action) => {
    //   const value = action.payload;
    //   state.password = value; // action.payload.password
    // },
    logon: (state) => {
      //  state.username = action.payload.username;
      // state.password = action.payload.password;
      state.authorized = true;
    },
    logoff: (state) => {
      state.authorized = false;
    },
  },
});

export const { logon, logoff } = authSlice.actions;
export const selectValid = (state: { auth: AuthState }) =>
  state.auth.authorized;
// export const selectPwd = state => state.auth.password;
export default authSlice.reducer;
