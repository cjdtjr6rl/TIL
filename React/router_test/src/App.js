import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Profile from "./components/profile";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path={["/", "/home"]} exact>
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
