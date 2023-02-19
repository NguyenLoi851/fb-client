import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./user/index";

const rootReducer = combineReducers({
  user: userSlice,
  // registerInfo: registerInfoSlice,
});

export const store = configureStore({
  reducer: rootReducer, middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
});
