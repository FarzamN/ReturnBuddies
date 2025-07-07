import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pathType: "",
};

export const pickupSlice = createSlice({
  name: "pickup",
  initialState,
  reducers: {
    setPathType: (state, action) => {
      state.pathType = action.payload;
    },
  },
});

export const { setPathType } = pickupSlice.actions;

export default pickupSlice.reducer;
