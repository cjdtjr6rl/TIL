import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './usertalk.module.css';

const UserTalk = memo(({ myId, user }) => {
    return (
        <>
            { user !== myId ?
                (<Link className={styles.link} to={`/${user}`}>
                        <li className={styles.user}>
                        {user}
                    </li>
                </Link>) : <div className={styles.none}></div>
            }
        </>
    );
});

export default UserTalk;