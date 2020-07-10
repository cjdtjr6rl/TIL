import React, { useRef } from 'react';
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
  {/** 4. */}
  const users = [
    {
        id: 1,
        username: 'Junnna',
        email: 'tnstnejddjfl@naver.com'
    },
    {
        id: 2,
        username: 'tester',
        email: 'tester@gamil.com'
    },
    {
        id: 3,
        username: 'amaze',
        email: 'amaze@hanmail.com'
    }
  ];

  const nextId = useRef(4);

  const onCreate = () => {
    console.log(nextId.current);
    nextId.current += 1;
  }

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
    <UserList users={users} />
    </>
  );
}

export default App;
