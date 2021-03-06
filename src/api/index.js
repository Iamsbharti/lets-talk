import axios from "axios";
import { toast } from "react-toastify";
//import { disconnect } from "../api/clientSocket";
const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4300/api/chat";
export async function login({ email, password, room }) {
  // console.log("api-call-login", email, password);

  try {
    let response = await axios.post(url + "/login", {
      email: email,
      password: password,
    });
    //console.log("response", response);

    let { status, message, data } = response.data;

    if (status !== 200) {
      /**Error Resposne */
      toast.error(message);
      let userdata = {
        isAuthenticated: false,
      };
      return userdata;
    } else {
      /**Sucess response */
      let { authToken } = data;
      //console.log(authToken);
      /**Store AuthToken for chat authorization*/
      localStorage.setItem("authToken", authToken);
      let { firstName, lastName, userid } = data.userDetails;
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      //console.log(firstName, lastName);
      console.log("message", message, room);
      toast.success(message);
      let userdata = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        room: room,
        isAuthenticated: true,
        userid: userid,
      };

      return userdata;
    }
  } catch (error) {
    toast.error(error);
    console.log("api call error", error);
  }
}

export async function register({ firstName, lastName, email, password }) {
  console.log("call register-api", email);

  //call register route
  try {
    let response = await axios.post(url + "/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    console.log("response", response.data);
    const { error, status, message } = response.data;
    console.log("api res", error, status, message);
    if (status !== 200) {
      console.log("error");
      toast.error(message);
    } else {
      console.log("sucess");
      toast.success(message);
    }
    return message;
  } catch (error) {
    console.log(error);
  }
}
export async function logout(email) {
  // console.log("Logout -api-call", email);
  try {
    let response = await axios.post(url + "/logout", {
      email: email,
    });
    let { error, message, status } = response.data;
    console.log("logout-api-response", error, message, status);
    if (status !== 200) {
      let res = {
        message,
        isAuthenticated: true,
      };
      return res;
    } else {
      let res = {
        message,
        isAuthenticated: false,
      };
      /**Remove tokens from localstorage */
      localStorage.removeItem("authToken");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");

      /**Emmit disconnect web socket listener */
      // disconnect();
      return res;
    }
  } catch (error) {
    console.log("logout error", error);
  }
}
