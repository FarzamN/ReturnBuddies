import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  pathType: '',
  pickupData: {
    active: [],
    past: [],
  },
  pickupDetailData: {
    data: {},
    trackingNumber: '',
  },
};

export const pickupSlice = createSlice({
  name: 'pickup',
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
    setPickupDetailData: (state, action) => {
      state.pickupDetailData = {
        ...state.pickupDetailData,
        ...action.payload,
      };
    },
  },
});

export const {setPathType, setPickupData, setPickupDetailData} =
  pickupSlice.actions;

export default pickupSlice.reducer;
