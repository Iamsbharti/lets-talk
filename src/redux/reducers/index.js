import { registerReducer } from "./registerReducer";
import loginReducer from "./loginReducer";
import logoutReducer from "./logoutReducer";
import { combineReducers } from "redux";

export default combineReducers({
  signUpResult: registerReducer,
  loginResponse: loginReducer,
  logoutResponse: logoutReducer,
});
