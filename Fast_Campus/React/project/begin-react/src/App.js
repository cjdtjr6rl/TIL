import React from 'react';
// 1.
import Hello from './Hello'
import Wrapper from './Wrapper';
// 2.
import Counter from './Counter';
// 3.
import InputSample from './InputSample';
// 4.
import UserList from './UserList';

function App() {
  return (
    <>
    {/** 1. */}
    <Wrapper>
      <Hello name="react" color="red" isSpecial={true} />
      <Hello color="purple" />
    </Wrapper>
    {/** 2. */}<br /><hr />
    <Counter />
    {/** 3. */}<br /><hr />
    <InputSample />
    {/** 4. */}<br /><hr />
    <UserList />
    </>
  );
}

export default App;
