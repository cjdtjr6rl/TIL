import { createStandardAction, createReducer } from "typesafe-actions";

export const increase = createStandardAction("counter/INCREASE")();
export const decrease = createStandardAction("counter/DECREASE")();
export const increaseBy = createStandardAction("counter/INCREASE_BY")<number>();

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

const counter = createReducer(initialState)
  .handleAction(increase, (state) => ({ count: state.count + 1 }))
  .handleAction(decrease, (state) => ({ count: state.count - 1 }))
  .handleAction(increaseBy, (state, action) => ({
    count: state.count + action.payload,
  }));

export default counter;
