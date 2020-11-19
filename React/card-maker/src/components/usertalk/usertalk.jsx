import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './usertalk.module.css';

const UserTalk = memo(({ myId, user }) => {
    const { user_id } = user;
    const onClick = () => {
        console.log(user_id);
    }
    return (
        <>
            { user_id !== myId ?
                (<Link className={styles.link} to={`/${user_id}`}>
                        <li className={styles.user} onClick={onClick}>
                        {user_id}
                    </li>
                </Link>) : <div className={styles.none}></div>
            }
        </>
    );
});

export default UserTalk;