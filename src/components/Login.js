import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "../redux/actions";
function Login({ loginAction, loginResponse }) {
  const [username, setusername] = useState("");
  const [password, setPwd] = useState("");
  const [room, setRoom] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(username, password, room);
    let userdata = {
      email: username,
      password: password,
    };
    loginAction(userdata);
  };

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
        </form>
      </main>
    </div>
  );
}
const mapStateToProps = ({ loginResponse }) => {
  return { loginResponse };
};
const mapActionToProps = { loginAction };
export default connect(mapStateToProps, mapActionToProps)(Login);
