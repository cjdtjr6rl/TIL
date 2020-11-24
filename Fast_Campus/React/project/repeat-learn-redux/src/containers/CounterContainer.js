import React from "react";
import Counter from "../components/Counter";
// 상태를 조회
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { decrease, increase, setDiff } from "../modules/counter";

function CounterContainer() {
  // useSelector는 상태를 조회, state의 상태를 조회
  // selector를 계속 객체를 생성하는 것이기 때문에 계속 호출되는 것
  // const { number, diff } = useSelector((state) => ({
  //   number: state.counter.number,
  //   diff: state.counter.diff,
  // }));
  // 방법1) 이렇게 selector를 따로 호출하는 방법
  // const number = useSelector((state) => state.counter.number);
  // const diff = useSelector((state) => state.counter.diff);
  // 방법2) useSelector의 다음 파라미터에 이전 상태와 다음 상태를 비교하는 함수를 만드는 방법
  const { number, diff } = useSelector(
    (state) => ({
      number: state.counter.number,
      diff: state.counter.diff,
    }),
    // equalifyFn을 사용하여 전부 비교를 해 주어야 함
    // (left, right) => {
    //   return left.diff === right.diff && left.number === right.number;
    // }
    // 방법3) 전부 비교해주는 함수인 shallowEqual이라는 함수를 사용하면 됨
    // 이것은 얕게 비교를 하는 방법이기 때문에 전부 다 비교를 해주지는 않음
    shallowEqual
  );

  const dispatch = useDispatch();

  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = (diff) => dispatch(setDiff(diff));

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;
