import { registerReducer } from "./registerReducer";
import { combineReducers } from "redux";
import sessionManager from "./sessionReducer";
export default combineReducers({
  signUpResult: registerReducer,
  session: sessionManager,
});
