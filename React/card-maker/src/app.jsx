import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import Maker from "./components/maker/maker";
import Login from "./components/login/login";
import Review from "./components/review/review";

function App({ FileInput, authService, cardRepository, commentRepository, userRepository }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login authService={authService} />
          </Route>
          <Route path="/maker">
            <Maker FileInput={FileInput} authService={authService} cardRepository={cardRepository} />
          </Route>
          <Route path="/review">
            <Review authService={authService} commentRepository={commentRepository} userRepository={userRepository} division='1'/>
          </Route>
          <Route path="/7ncPqnKXWJgY3cwTSA8wa2vOEP22">
            <Review authService={authService} commentRepository={commentRepository} userRepository={userRepository} division='2'/>
          </Route>
          <Route path="/hfR91CN8nyb8pLDnj4GGKENNUYk1">
            <Review authService={authService} commentRepository={commentRepository} userRepository={userRepository} division='3'/>
            </Route>
          <Route path="/FA4cFb1v0yV0u2AUelp6GthI1Yf2">
            <Review authService={authService} commentRepository={commentRepository} userRepository={userRepository} division='4'/>
            </Route>
          <Route path="/xLvrwgNN3Zgxpr26oCbA6ouL4Ci2">
            <Review authService={authService} commentRepository={commentRepository} userRepository={userRepository} division='5'/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
