import React, { useEffect, useState } from "react";
import "../App.css";
import { connect } from "react-redux";
import { logoutAction } from "../redux/actions";
import { clientSocket, welcomeMessage } from "../api/clientSocket";
import io from "socket.io-client";
const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4300/chat";

const socket = io(url);
//console.log("socket", socket);
function Chat({
  firstName,
  lastName,
  email,
  room,
  isAuthenticated,
  message,
  logoutAction,
}) {
  const handleLogout = async (event) => {
    event.preventDefault();
    console.log("Logout", email);
    logoutAction(email);
  };
  //state init
  const [welcomeTxt, setWelTxt] = useState("");
  let fullname = `${firstName},${lastName}`;
  useEffect(() => {
    clientSocket();
    welcomeMessage((data) => setWelTxt(data));
    socket.emit("userEmail", firstName);
    socket.on("msg", (data) => console.log(data));
  }, [isAuthenticated, firstName]);

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-comments"></i>
          {fullname}
        </h1>
        {welcomeTxt}
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
const mapStateToProps = ({ session }) => {
  let {
    firstName,
    lastName,
    email,
    room,
    message,
    isAuthenticated,
  } = session.user;

  //console.log("state-chat", isAuthenticated);
  return { firstName, lastName, email, room, message, isAuthenticated };
};

const mapActionToProps = { logoutAction };
export default connect(mapStateToProps, mapActionToProps)(Chat);
