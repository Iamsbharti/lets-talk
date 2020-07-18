import axios from "axios";
import { toast } from "react-toastify";

const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4300/api/chat";
export async function login({ email, password }) {
  console.log("api-call-login", email, password);

  try {
    let response = await axios.post(url + "/login", {
      email: email,
      password: password,
    });
    //console.log("response", response);

    let { error, status, message, data } = response.data;

    if (error) {
      throw new Error(error);
    }
    if (status !== 200) {
      /**Error Resposne */
      toast.error(message);
      return message;
    } else {
      /**Sucess response */
      let { authToken } = data;
      console.log(authToken);
      localStorage.setItem("authToken", authToken);
      let { firstName, lastName } = data.userDetails;
      console.log(firstName, lastName);
      console.log("auth", response.headers["authToken"]);
      console.log("message", message);
      toast.success(message);
      return message;
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
