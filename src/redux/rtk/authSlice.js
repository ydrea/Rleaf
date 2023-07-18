import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'login',
  initialState: {
    // username: 'Foo',
    password: '',
    authorized: false,
  },
  reducers: {
    // setUsername: (state, action) => {
    //   const value = action.payload;
    //   state.username = value; // action.payload.username
    // },
    // setPassword: (state, action) => {
    //   const value = action.payload;
    //   state.password = value; // action.payload.password
    // },
    logon: (state, action) => {
      //  state.username = action.payload.username;
      // state.password = action.payload.password;
      state.authorized = true;
    },
    logoff: state => (state.authorized = false),
  },
});
export const { logon, logoff, setUsername, setPassword } =
  authSlice.actions;
export const selectValid = state => state.auth.authorized;
// export const selectPwd = state => state.auth.password;
export default authSlice.reducer;
