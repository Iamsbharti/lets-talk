import React from "react";
const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4300/test";
export default function Register() {
  const api = () => {
    console.log("api call");
    fetch(url).then((data) => console.log(data));
  };
  api();
  return (
    <div>
      <h1>Register</h1>
    </div>
  );
}
