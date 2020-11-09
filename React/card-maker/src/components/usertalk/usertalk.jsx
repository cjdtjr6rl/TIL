import React from 'react';
import styles from './usertalk.module.css';

const UserTalk = ({ myId, user }) => {

    return (
        <>
            { user !== myId ? 
                (<li>
                    {user}
                </li>) : <div></div>
            }
        </>
    );
};

export default UserTalk;