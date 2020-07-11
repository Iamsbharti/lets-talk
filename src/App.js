import React from "react";
import "./App.css";

import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  return (
    <div className="App-header">
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </div>
  );
}

export default App;
