import { configureStore } from "@reduxjs/toolkit";
import combineReducer from "../slices/combineReducer";

const store = configureStore({
  reducer: combineReducer,
  devTools: true,
});
export default store;
