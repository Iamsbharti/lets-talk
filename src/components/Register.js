import React, { useState, useEffect } from "react";
import { signUpAction } from "../redux/actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
function Register({ signUpAction, signUpResult }) {
  //define state
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userdata = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    //console.log("signup action", userdata);
    signUpAction(userdata);
  };
  //init history

  useEffect(() => {
    if (signUpResult === "User Exists") {
      setFname("");
      setLname("");
      setEmail("");
      setPwd("");
    } else if (signUpResult === "User Created Success") {
      history.push("/");
    }
  }, [signUpResult, history]);
  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-comments"></i> Register
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
const mapStateToProps = ({ signUpResult }) => {
  return { signUpResult };
};
const mapActionsToProps = {
  signUpAction,
};
export default connect(mapStateToProps, mapActionsToProps)(Register);
