import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import Maker from "./components/maker/maker";
import Login from "./components/login/login";
import Score from "./components/score/score";

function App({ FileInput, authService, cardRepository }) {
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
          <Route path="/score">
            <Score authService={authService} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
