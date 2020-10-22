import React, { memo } from 'react';
import styles from './talk.module.css';

const Talk = memo(({ authService, comments }) => {
    const DEFAULT_IMAGE = '/images/pumpkin.png';
    const {name, comment, userId, fileURL} = comments;
    const url = fileURL || DEFAULT_IMAGE;
    return (
        <li className={`${styles.comments} ${ userId ? styles.me : styles.another}`}>
            <img className={styles.avatar} src={url} alt="profile"/>
            <div className={styles.talk}>
                <div className={styles.name}>{name}</div>
                <div className={styles.comment}>{comment}</div>
            </div>
        </li>
    );
});

export default Talk;