import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
    // useEffect(() => {
    //     console.log('컴포넌트가 화면에 나타남');
    //     return () => {
    //         console.log('컴포넌트가 화면에서 사라짐');
    //     }
    // }, []); // deps가 비어 있을 경우 컴포넌트가 처음 화면에 나타날 때에만 실행이 됨
    useEffect(() => {
        console.log('user값이 설정됨');
        console.log(user);
        return() => {
            console.log('user값이 바뀌기 전');
            console.log(user);
        }
    }, [user]);
    return (
        <div>
            <b style={{
                color: user.active ? 'green' : 'black',
                cursor: 'pointer'
            }} onClick={() => onToggle(user.id)}>
                {user.username}
            </b>&nbsp;
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
}

function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
            {
                users.map(
                    user => (<User key={user.id} user={user} onRemove={onRemove} onToggle={onToggle} />)
                )
            }
        </div>
    );
}

export default UserList;