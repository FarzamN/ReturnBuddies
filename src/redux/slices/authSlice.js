import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  rememberMe: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.rememberMe = action.payload.rememberMe;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.rememberMe = false;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
