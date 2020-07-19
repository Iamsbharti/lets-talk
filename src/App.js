import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Chat from "./components/Chat";
function App() {
  return (
    <div>
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/chat" exact component={Chat} />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
