import { combineReducers } from "@reduxjs/toolkit";
import { authSlice, draftSlice } from "./slices";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  draft: draftSlice.reducer,
});

export { rootReducer };
