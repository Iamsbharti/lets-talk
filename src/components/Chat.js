import React, { useEffect } from "react";
import "../App.css";
import { connect } from "react-redux";
import { logoutAction } from "../redux/actions";
import { useHistory } from "react-router-dom";
function Chat({
  firstName,
  lastName,
  email,
  room,
  loggedOut,
  message,
  logoutAction,
}) {
  let history = useHistory();
  const handleLogout = async (event) => {
    event.preventDefault();
    console.log("Logout", email);
    logoutAction(email);
  };
  //<i class="fas fa-spinner"></i>;
  useEffect(() => {
    if (loggedOut) {
      setTimeout(() => history.push("/"), 2500);
    }
  }, [loggedOut]);

  return loggedOut ? (
    <i className="fas fa-spinner">{message}</i>
  ) : (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-comments"></i>
          {`${firstName},${lastName}`}
        </h1>

        <h2 className="logout-div" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>Logout
        </h2>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="far fa-comment-alt">Room Name</i>
          </h3>
          <h2>{room}</h2>
          <h3>
            <i className="fas fa-users"></i>Users
          </h3>
          <ul></ul>
        </div>
        <div className="chat-messages"></div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
          />
          <button className="btn">
            <i className="fas fa-paper-plane"></i>Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
const mapStateToProps = ({ loginResponse, logoutResponse }) => {
  let { firstName, lastName, email, room } = loginResponse;
  let { message, loggedOut } = logoutResponse;
  console.log("state-chat", room, message, loggedOut);
  return { firstName, lastName, email, room, message, loggedOut };
};

const mapActionToProps = { logoutAction };
export default connect(mapStateToProps, mapActionToProps)(Chat);
