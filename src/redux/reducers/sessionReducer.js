import { session_state } from "./defaultState";
import {
  LOGIN,
  LOGOUT,
  AUTHENTICATED,
  AUTHENTICATING,
  NOT_AUTHENTICATED,
} from "../actions/actionType";

export default function sessionManager(
  usersession = session_state.session || {},
  action
) {
  console.log("Session manager");
  switch (action.type) {
    case LOGIN:
      return {
        ...usersession,
        user: action.loginResponse,
        authStatus: action.loginResponse.isAuthenticated
          ? AUTHENTICATED
          : NOT_AUTHENTICATED,
      };
    case LOGOUT: {
      return {
        ...usersession,
        user: action.logoutResponse,
        authStatus: AUTHENTICATING,
      };
    }
    default:
      return usersession;
  }
}
