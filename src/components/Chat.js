import React, { useEffect, useState } from "react";
import "../App.css";
import { connect } from "react-redux";
import { logoutAction } from "../redux/actions";
//import { clientSocket, welcomeMessage } from "../api/clientSocket";
import io from "socket.io-client";
import { toast } from "react-toastify";
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
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    console.log("Listen to welcome mesg from server");
    socket.on("welcome", (data) => {
      //console.log("From Server:", data);
      setWelTxt(data);
    });
    console.log("Listen to broadcast online user");
    socket.on("userJoined", (data) => {
      setOnline(true);
    });
    console.log("Emmit the username");
    socket.emit("userEmail", firstName);
    socket.emit("room", room);
    socket.on("msg", (data) => console.log(data));
    console.log("Listen to online user array");
    socket.on("online-users", (data) => {
      console.log("data", data);
      setOnlineUsers(data);
    });
    socket.on("msg", (data) => {
      if (data.split(" ")[0] !== firstName) {
        toast.success(data);
      }
    });
    //console.log("online users", onlineUsers);
    //online && toast.success("online");
  }, [isAuthenticated]);
  console.log("data", online, onlineUsers);
  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-comments"></i>
          {firstName}
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
          {
            <ul>
              {onlineUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          }
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
