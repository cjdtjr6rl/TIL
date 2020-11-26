import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

// saga를 Generator함수로 작성
function* increaseSaga() {
  // delay는 기다려라라는 뜻 (1000은 1초)
  yield delay(1000);
  // put은 Redux saga가 action을 dispatch하라는 것
  yield put(increase());
}
function* decreaseSage() {
  yield delay(500);
  yield put(decrease());
}
// 내보내 주어야 하는 이유는
// 여러가지 reducer를 rootReducer를 만든 것 처럼
// 여러가지 saga를 rootSaga를 만들 것이기 때문
export function* counterSaga() {
  // takeEvery는 INCREASE_ASYNC가 dispatch될 때마다 increaseSaga가 실행되도록 하는 것
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  // takeLatest 가장 마지막에 DECREASE_ASYNC가 dispatch가 되는 decreaseSaga가 실행되는 것
  // 앞서 실행된 것은 무시
  yield takeLatest(DECREASE_ASYNC, decreaseSage);
}

const initialState = 0;

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
