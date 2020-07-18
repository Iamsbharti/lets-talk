import axios from "axios";

const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4300/api/chat";
export async function login(email, password) {}

export async function register({ firstName, lastName, email, password }) {
  console.log("call register-api", email);
  //call register route

  await axios
    .post(url + "/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
    .then((response) => {
      console.log("response", response.data);
      const { error, status, message } = response.data;
      console.log("api res", error, status, message);
      return message;
    })
    .catch((error) => console.log("error", error.message));
}
