import React from 'react';
import UserTalk from '../usertalk/usertalk';
import styles from './userlist.module.css';

const UserList = ({ users, myId }) => (
        <section className={styles.userlist}>
            <ul className={styles.users}>
                {Object.keys(users).map(key => (
                    <UserTalk key={key} user={users[key]} myId={myId} />
                ))}
            </ul>
        </section>
);

export default UserList;