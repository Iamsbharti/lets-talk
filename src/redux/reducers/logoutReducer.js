import { LOGOUT } from "../actions/actionType";

export default function logoutReducer(
  logoutResponse = { loggedOut: false, message: "" },
  action
) {
  console.log("logout reducer", action.logoutResponse);
  switch (action.type) {
    case LOGOUT:
      return action.logoutResponse;
    default:
      return logoutResponse;
  }
}
