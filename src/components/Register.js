import React, { useState } from "react";
import { register } from "../api";
import { Link } from "react-router-dom";
export default function Register() {
  //define state
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("api call", firstName, lastName, email, password);
    let result = await register(firstName, lastName, email, password);
    console.log(result);
  };

  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> Register
        </h1>
      </header>
      <main className="join-main">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="firstName">firstName</label>
            <input
              type="text"
              name="username"
              value={firstName}
              placeholder="Enter firstname..."
              required
              onChange={(event) => setFname(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="lastName">lastName</label>
            <input
              type="text"
              name="username"
              value={lastName}
              placeholder="Enter lastname..."
              required
              onChange={(event) => setLname(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">email</label>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Enter email..."
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              value={password}
              placeholder="Enter password..."
              required
              onChange={(event) => setPwd(event.target.value)}
            />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          <Link to="/">
            <button type="submit" className="btn">
              Login
            </button>
          </Link>
        </form>
      </main>
    </div>
  );
}
