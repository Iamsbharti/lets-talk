import React from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Chat from "./components/Chat";
import { connect } from "react-redux";
function App({ isAuthenticated }) {
  console.log("App init");
  const RouterGuard = (Component) => ({ match }) => {
    if (!isAuthenticated) {
      // console.log("App routes", match);
      return <Redirect to="/" />;
    } else {
      return <Component match={match} />;
    }
  };
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/chat" exact render={RouterGuard(Chat)} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}
const mapStateToProps = ({ session }) => {
  let { isAuthenticated } = session.user;
  return { isAuthenticated };
};
export default connect(mapStateToProps)(App);
