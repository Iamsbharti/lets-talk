import { LOGIN } from "../actions/actionType";
export default function loginReducer(loginResponse = "", action) {
  switch (action.type) {
    case LOGIN:
      return action.loginResponse;
    default:
      return loginResponse;
  }
}
