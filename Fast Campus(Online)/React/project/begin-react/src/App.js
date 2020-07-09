import React from 'react';
// 1.
import Hello from './Hello'
import Wrapper from './Wrapper';
// 2.
import Counter from './Counter';
import InputSample from './InputSample';
// 3.


function App() {
  return (
    <>
    {/** 1. */}
    <Wrapper>
      <Hello name="react" color="red" isSpecial={true} />
      <Hello color="purple" />
    </Wrapper>
    {/** 2. */}
    <Counter />
    {/** 3. */}
    <InputSample />
    </>
  );
}

export default App;
