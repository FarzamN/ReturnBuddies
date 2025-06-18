import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draftData: [],
  draftSelectedRetun: [],
  draftReturn: {
    _id: "",
    date: null,
    time: null,
    pickupMethod: "Doorstep",
    note: "",
  },
  labelID: [],
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
    setLabelID: (state, action) => {
      state.labelID = action.payload;
    },
    setDraftReturn: (state, action) => {
      state.draftReturn = {
        ...state.draftReturn,
        ...action.payload,
      };
    },
  },
});

export const {
  setDraftItem,
  setDraftSelectedRetun,
  setDraftReturn,
  setLabelID,
} = draftSlice.actions;

export default draftSlice.reducer;
