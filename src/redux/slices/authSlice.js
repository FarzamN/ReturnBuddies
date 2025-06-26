import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  rememberMe: false,
  otp: null,
  loading: false,
  getAddress: [],
  getPayments: [],
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
    setOTP: (state, action) => {
      state.otp = action.payload;
    },
    setGetAddress: (state, action) => {
      state.getAddress = action.payload;
    },
    setGetPayments: (state, action) => {
      state.getPayments = action.payload;
    },
    updatePaymentCard: (state, action) => {
      if (state.user) {
        state.user.payment = action.payload;
      }
    },
    updateAddress: (state, action) => {
      if (state.user) {
        state.user.pickupAddress = action.payload;
      }
    },
  },
});

export const {
  setLogin,
  setLogout,
  setOTP,
  setGetAddress,
  setGetPayments,
  updatePaymentCard,
  updateAddress,
} = authSlice.actions;

export default authSlice.reducer;
