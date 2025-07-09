import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pathType: "",
  pickupData: {
    active: [],
    post: [],
  },
};

export const pickupSlice = createSlice({
  name: "pickup",
  initialState,
  reducers: {
    setPathType: (state, action) => {
      state.pathType = action.payload;
    },
    setPickupData: (state, action) => {
      state.pickupData = {
        ...state.pickupData,
        ...action.payload,
      };
    },
  },
});

export const { setPathType, setPickupData } = pickupSlice.actions;

export default pickupSlice.reducer;
