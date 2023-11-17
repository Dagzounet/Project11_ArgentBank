import { combineReducers } from "redux";
import loginSlice from "./loginSlice";
import profileSlice from "./profileSlice";

export default combineReducers({
  loginSlice,
  profileSlice,
});
