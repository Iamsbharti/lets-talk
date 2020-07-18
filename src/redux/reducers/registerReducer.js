import { SIGNUP } from "../actions/actionType";

export function registerReducer(registerStatus = "", action) {
  console.log("register reducer");
  switch (action.type) {
    case SIGNUP:
      return action.userdata;
    default:
      return registerStatus;
  }
}
