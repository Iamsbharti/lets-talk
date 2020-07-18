import { SIGNUP, LOGIN } from "./actionType";
import { register, login } from "../../api";
export function loginAction(userdata) {
  console.log("login-action");
  return async (dispatch) => {
    let loginResponse = await login(userdata);
    dispatch({ type: LOGIN, loginResponse });
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
