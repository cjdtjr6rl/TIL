import React, { useState, useRef, useMemo, useCallback } from 'react';
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

// 8.
function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

function App() {
  // 5.
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  
  // 4.
  const [users, setUsers] = useState([
    {
        id: 1,
        username: 'Junnna',
        email: 'tnstnejddjfl@naver.com',
        active: true,
    },
    {
        id: 2,
        username: 'tester',
        email: 'tester@gamil.com',
        active: false,
    },
    {
        id: 3,
        username: 'amaze',
        email: 'amaze@hanmail.com',
        active: false,
    }
  ]);

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
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
    nextId.current += 1;
  }, [username, email, users]);
  
  // 그러므로 onChange함수는 inputs가 바뀔 때만 새로 만들어지고 그렇지 않다면 기존에 만들어진 함수를 재사용함
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]); // useState를 쓰고 내부에서 의존하고 있는 값인 inputs를 사용하고 있기에 deps로 지정

  // 6.
  const onRemove = useCallback(id => {
    setUsers(users.filter(user => user.id !== id));
  }, [users]);

  // 7.
  const onToggle = useCallback(id => {
    setUsers(users.map(
      user => user.id === id
      ? { ...user, active: !user.active }
      : user
    ));
  }, [users]);

  // 8.
  // 연산된 결과값을 재사용 (useMemo)
  const count = useMemo(() => countActiveUsers(users), [users]);

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
    <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    {/** 8. */}<br /><hr />
    <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
