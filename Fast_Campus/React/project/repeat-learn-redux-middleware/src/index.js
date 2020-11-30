import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer, { rootSaga } from "./modules";
// 내가 만든 middleware
// import myLogger from "./middlewares/myLogger";
// redux-logger란 라이브러리를 사용한 middelware
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});

const store = createStore(
  rootReducer,
  // redux-devtools-extension을 사용하기 위하여 middleware를 감싸줌
  // applyMiddleware라는 라이브러리를 사용하여 middleware를 사용
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);

// run이란 함수를 등록해주어야 함 그때 rootSaga를 불러와 넣어 주어야 함
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
