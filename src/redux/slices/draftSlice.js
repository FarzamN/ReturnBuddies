import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draftData: [],
  draftSelectedRetun: [],
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
  },
});

export const { setDraftItem, setDraftSelectedRetun } = draftSlice.actions;

export default draftSlice.reducer;
