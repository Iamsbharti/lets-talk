import axios from "axios";
import { toast } from "react-toastify";

const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4300/api/chat";
export async function login({ email, password, room }) {
  console.log("api-call-login", email, password);

  try {
    let response = await axios.post(url + "/login", {
      email: email,
      password: password,
    });
    //console.log("response", response);

    let { error, status, message, data } = response.data;

    if (status !== 200) {
      /**Error Resposne */
      toast.error(message);
      let userdata = {
        loggedIn: false,
      };
      return userdata;
    } else {
      /**Sucess response */
      let { authToken } = data;
      //console.log(authToken);
      /**Store AuthToken for chat authorization*/
      localStorage.setItem("authToken", authToken);
      let { firstName, lastName } = data.userDetails;
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      //console.log(firstName, lastName);
      console.log("message", message, room);
      toast.success(message);
      let userdata = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        loggedIn: true,
        room: room,
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
