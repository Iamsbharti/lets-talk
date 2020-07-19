import React from "react";
import "../App.css";
import { connect } from "react-redux";
function Chat({ roomname, username }) {
  const handleLogout = (event) => {
    event.preventDefault();
    console.log("Logout");
  };
  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-comments"></i>Let's Talk
        </h1>
        {username}
        <h2 className="logout-div" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>Logout
        </h2>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="far fa-comment-alt">Room Name</i>
          </h3>
          <h2>{roomname}</h2>
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
const mapStateToProps = () => {};
const mapActionToProps = {};
export default connect(mapStateToProps, mapActionToProps)(Chat);
