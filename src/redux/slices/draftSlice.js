import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draftData: [],
  draftSelectedRetun: [],
  draftReturn: {
    _id: "",
    date: null,
    time: null,
    pickupMethod: 1,
  },
};

export const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    setDraftItem: (state, action) => {
      state.draftData = action.payload;
    },
    setDraftSelectedRetun: (state, action) => {
      state.draftSelectedRetun = action.payload;
    },
    setDraftReturn: (state, action) => {
      state.draftReturn._id = action.payload._id;
      state.draftReturn.date = action.payload.date;
      state.draftReturn.time = action.payload.time;
      state.draftReturn.pickupMethod = action.payload.pickupMethod;
    },
  },
});

export const { setDraftItem, setDraftSelectedRetun, setDraftReturn } =
  draftSlice.actions;

export default draftSlice.reducer;
