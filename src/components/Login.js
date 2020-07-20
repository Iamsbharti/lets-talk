import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "../redux/actions";
function Login({ loginAction, loggedIn }) {
  /**define state */
  const [username, setusername] = useState("");
  const [password, setPwd] = useState("");
  const [room, setRoom] = useState("");
  let history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(username, password, room);
    let userdata = {
      email: username,
      password: password,
      room: room,
    };
    loginAction(userdata);
  };

  useEffect(() => {
    loggedIn && setTimeout(() => history.push("/chat"), 1500);
  }, [loggedIn, history]);
  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-comments" aria-hidden="true"></i> let's talk
        </h1>
      </header>
      <main className="join-main">
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter username..."
              required
              onChange={(event) => setusername(event.target.value)}
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
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <select
              name="room"
              value={room}
              onChange={(event) => setRoom(event.target.value)}
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="C#">C#</option>
              <option value="Ruby">Ruby</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Join Chat
          </button>
          <Link to="/register">
            <button className="btn">Register</button>
          </Link>
          {loggedIn !== undefined && !loggedIn ? <span>Login Falied</span> : ""}
        </form>
      </main>
    </div>
  );
}
const mapStateToProps = ({ loginResponse }) => {
  let { loggedIn } = loginResponse;
  console.log("loggedIn", loggedIn);
  return { loggedIn };
};
const mapActionToProps = { loginAction };
export default connect(mapStateToProps, mapActionToProps)(Login);
