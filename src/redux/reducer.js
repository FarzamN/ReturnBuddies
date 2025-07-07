import { combineReducers } from "@reduxjs/toolkit";
import { authSlice, draftSlice, pickupSlice } from "./slices";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  draft: draftSlice.reducer,
  pickup: pickupSlice.reducer,
});

export { rootReducer };
