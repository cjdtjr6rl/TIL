import { combineReducers } from "redux";
import counter, { counterSaga } from "./counter";
import { all } from "redux-saga/effects";

// rootReducer
const rootReducer = combineReducers({ counter });

// rootSaga
export function* rootSaga() {
  yield all([counterSaga()]);
}

export default rootReducer;
