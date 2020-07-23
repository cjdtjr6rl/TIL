import React from 'react';

function User({ user }) {
    // if(!user) return <div>User가 없습니다.</div>;

    return(
        <div>
            <div>
                <b>ID</b>: {user.id}
            </div>
            <div>
                <b>Username</b>: {user.username}
            </div>
        </div>
    );
}

export default User;