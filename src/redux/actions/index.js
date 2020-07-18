import { SIGNUP, LOGIN } from "./actionType";
import { register } from "../../api";
export function loginAction(userdata) {
  console.log("login-action");
  return (dispatch) => {
    dispatch({ type: LOGIN, userdata });
  };
}
export function signUpAction(userdata) {
  console.log("signup-action-call");
  return async (dispatch) => {
    //call api
    let signUpResult = await register(userdata);
    console.log("signUpResult,action", signUpResult);
    dispatch({ type: SIGNUP, signUpResult });
  };
}
