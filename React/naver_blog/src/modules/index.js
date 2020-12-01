import { combineReducers } from "redux";
import posts, { postsSaga } from "./posts";
import { all } from "redux-saga/effects";

// rootReducer
const rootReducer = combineReducers({ posts });

// rootSaga
export function* rootSaga() {
  yield all([postsSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;
