import { SIGNUP, LOGIN } from "./actionType";

export function loginAction(userdata) {
  return (dispatch) => {
    dispatch({ type: LOGIN, userdata });
  };
}
export function signUpAction(userdata) {
  return (dispatch) => {
    return (dispatch) => {
      dispatch({ type: SIGNUP, userdata });
    };
  };
}
