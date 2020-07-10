import React from 'react';

function User({ user }) {
    return (
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    );
}

function UserList({ users }) {
    return (
        <div>
            {
                users.map(
                    user => (<User key={user.id} user={user} />)
                )
            }
        </div>
    );
}

export default UserList;