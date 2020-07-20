import { registerReducer } from "./registerReducer";
import { combineReducers } from "redux";
import sessionManager from "./sessionReducer";
export default combineReducers({
  signUpResult: registerReducer,
  session: sessionManager,
});

/**
 * import loginReducer from "./loginReducer";
import logoutReducer from "./logoutReducer";
 *  loginResponse: loginReducer,
  logoutResponse: logoutReducer,
 */
