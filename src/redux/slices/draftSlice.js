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
    selectedAddress: null,
    selectedPayment: null,
  },
  labelID: [],
  getBaseData: {
    ADDITIONAL_ITEM_PRICE: 1,
    BASE_PRICE: 99.9,
    FREE_ITEMS_THRESHOLD: 10,
  },
  draftCompleteData: {},
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
    setGetBaseData: (state, action) => {
      state.getBaseData = {
        ...state.getBaseData,
        ...action.payload,
      };
    },
    setDraftCompleteData: (state, action) => {
      state.draftCompleteData = action.payload;
    },
  },
});

export const {
  setDraftItem,
  setDraftSelectedRetun,
  setDraftReturn,
  setLabelID,
  setGetBaseData,
  setDraftCompleteData,
} = draftSlice.actions;

export default draftSlice.reducer;
