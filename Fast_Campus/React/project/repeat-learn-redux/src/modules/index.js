// 루트 리듀서
// counter, todos의 리듀서를 합쳐주는 것
import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
