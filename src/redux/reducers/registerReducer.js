import { SIGNUP } from "../actions/actionType";

export function registerReducer(signUpResult = "", action) {
  //console.log("register reducer");
  switch (action.type) {
    case SIGNUP:
      return action.signUpResult;
    default:
      return signUpResult;
  }
}
