import React, { useState, useRef } from 'react';
// 1.
import Hello from './Hello'
import Wrapper from './Wrapper';
// 2.
import Counter from './Counter';
// 3.
import InputSample from './InputSample';
// 4.
import UserList from './UserList';
// 5.
import CreateUser from './CreateUser';

function App() {
  {/** 4. */}
  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]);
    setInputs({
      username: '',
      email: ''
    });
    console.log(nextId.current);
    nextId.current += 1;
  }
  {/** 5. */}
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

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
    {/** 5. */}<br /><hr />
    <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
    {/** 4. */}
    <UserList users={users} />
    </>
  );
}

export default App;
