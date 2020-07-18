import { registerReducer } from "./registerReducer";
import loginReducer from "./loginReducer";
import { combineReducers } from "redux";

export default combineReducers({
  signUpResult: registerReducer,
  loginResponse: loginReducer,
});
