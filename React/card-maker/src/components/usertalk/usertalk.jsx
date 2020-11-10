import React, { memo, useRef } from 'react';
import { useState } from 'react';
import styles from './usertalk.module.css';

const UserTalk = memo(({ myId, user }) => {
    const [userr, setUser] = useState('');
    const userRef = useRef();

    const userChange = (e) => {
        e.preventDefault();
        setUser(userRef.current.value);
        console.log(userr);
    }
    return (
        <>
            { user !== myId ?
                (<li ref={userRef} className={styles.user} onClick={userChange}>
                    {user}
                </li>) : <div></div>
            }
        </>
    );
});

export default UserTalk;