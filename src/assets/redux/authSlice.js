import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    token: {
      accessToken: "",
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    accessToken: (state, action) => {
      state.token.accessToken = action.payload;
    },
    logOut: (state) => {
      state.login.currentUser = null;
      state.token.accessToken = "";
    },
  },
});

export const { loginStart, loginFailed, loginSuccess, accessToken, logOut } =
  authSlice.actions;
export default authSlice.reducer;
