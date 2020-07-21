import React, { useReducer, useRef, useMemo, useCallback, createContext } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  users: [
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
  ]
}

function reducer(state, action) {
  switch(action.type) {
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.id
            ? { ...user, active: !user.active }
            : user
        )
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      throw new Error('Unhandled action');
  }
}

export const UserDispatch = createContext(null);

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const { username, email } = form;
  const nextID = useRef(4);
  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextID.current,
        username,
        email,
      }
    });
    nextID.current += 1;
    reset();
  }, [username, email, reset]);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} />
      <div>활성 사용자 수: {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
