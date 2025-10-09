import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draftData: [],
  draftSelectedRetun: [],
  draftReturn: {
    _id: "",
    note: "",
    date: null,
    time: null,
    selectedDateObj: {},
    selectedAddress: null,
    selectedPayment: null,
    pickupMethod: "Doorstep",
  },
  labelID: [],
  getBaseData: {
    BASE_PRICE: 11.99,
    ADDITIONAL_ITEM_PRICE: 1,
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
