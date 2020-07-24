import React, { useEffect, useState } from "react";
import "../App.css";
import { connect } from "react-redux";
import { logoutAction } from "../redux/actions";
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
  userid,
  isAuthenticated,
  message,
  logoutAction,
}) {
  console.log("render chat");
  const handleLogout = async (event) => {
    event.preventDefault();
    //console.log("Logout", email);
    logoutAction(email);
    //console.log("emit disconnect");
    socket.emit("offline", firstName);
  };
  const sendMessage = async (event) => {
    event.preventDefault();
    //console.log("Sending text");
    /**Emmit text send event */
    socket.emit("textSent", textMessage);
  };
  //state init
  const [welcomeTxt, setWelTxt] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [recievedText, setRecievedText] = useState("");

  //sender's info
  let chatMessage = {
    senderEmail: email,
    senderId: userid,
    content: textMessage,
    createdOn: Date.now(),
    senderName: firstName,
  };

  /**Socket listeners on users actions */
  /**Listen to online user array */
  socket.on("online-users", (data) => {
    setOnlineUsers(data);
  });

  /**Listen for real time online users */
  socket.on("instantOnline", (data) => {
    if (data !== firstName) {
      toast.info(data + " online");
    }
    //setOnline(true);
  });
  /**Listen for incoming text */
  socket.on("textRecieved", (data) => {
    setRecievedText(data);
  });

  /**Listen to offline listeners */
  socket.on("userOffline", (data) => {
    toast.info(data + " online");
    //setOnline(false);
  });
  useEffect(() => {
    /**Listen to welcome mesg from server */
    socket.on("welcome", (data) => {
      //console.log("From Server:", data);
      setWelTxt(data);
    });

    /**Emmit the username */
    socket.emit("userEmail", firstName);

    /**Emmit the room name */
    socket.emit("room", room);

    // console.log("Chat Message", chatMessage);
  }, [isAuthenticated]);
  //console.log("data", online, onlineUsers);
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
              {onlineUsers.map(
                (user, index) =>
                  user !== firstName && <li key={index}>{user}</li>
              )}
            </ul>
          }
        </div>
        <div className="chat-messages">{recievedText}</div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
            value={textMessage}
            onChange={(event) => setTextMessage(event.target.value)}
          />
          <button className="btn" onClick={sendMessage}>
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
    userid,
    room,
    message,
    isAuthenticated,
  } = session.user;

  //console.log("state-chat", isAuthenticated);
  return { userid, firstName, lastName, email, room, message, isAuthenticated };
};

const mapActionToProps = { logoutAction };
export default connect(mapStateToProps, mapActionToProps)(Chat);
