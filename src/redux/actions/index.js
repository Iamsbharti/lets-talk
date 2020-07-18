import { SIGNUP, LOGIN } from "./actionType";
import { register } from "../../api";
export function loginAction(userdata) {
  console.log("login-action");
  return (dispatch) => {
    dispatch({ type: LOGIN, userdata });
  };
}
export async function signUpAction(userdata) {
  console.log("signup-action");
  //call api
  let signUpResult = await register(userdata);
  console.log("signUpResult", signUpResult);
  return (dispatch) => {
    dispatch({ type: SIGNUP, signUpResult });
  };
}
