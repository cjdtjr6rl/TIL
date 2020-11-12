import React from 'react';
import { Link } from 'react-router-dom';
import UserTalk from '../usertalk/usertalk';
import styles from './userlist.module.css';

const UserList = ({ users, myId }) => {

    return (
        <section className={styles.userlist}>
            <ul className={styles.users}>
                <Link id="here" className={styles.link} to="/review">All Talking</Link>
                {Object.keys(users).map(key => (
                    <UserTalk key={key} user={users[key]} myId={myId} />
                ))}
            </ul>
        </section>
    );
}

export default UserList;