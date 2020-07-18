import { registerReducer } from "./registerReducer";
import { combineReducers } from "redux";

export default combineReducers({
  registerStatus: registerReducer,
});
