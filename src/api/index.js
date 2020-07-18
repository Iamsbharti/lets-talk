import axios from "axios";

const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4300/api/chat";
export async function login(email, password) {}
export async function register(firstName, lastName, email, password) {
  console.log("call register");
  //call register route
  try {
    let { data, status } = await axios.post(url + "/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    console.log(data);
    if (data && status === 200) {
      return data;
    }
  } catch (error) {
    console.warn(error.message);
  }
}
