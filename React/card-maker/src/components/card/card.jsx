import React, { memo } from 'react';
import styles from './card.module.css';

const Card = memo(({ card }) => {
    const DEFAULT_IMAGE = '/images/default_logo.png';
    const {name, company, title, email, message, theme, shape, fileURL} = card;
    const url = fileURL || DEFAULT_IMAGE;
    return (
        <li className={`${styles.card} ${getStyles(theme)} ${shapeStyles(shape)}`}>
            <img className={styles.avatar} src={url} alt="profile"/>
            <div className={styles.info}>
                <h1 className={styles.name}>{name}</h1>
                <p className={styles.company}>{company}</p>
                <p className={styles.title}>{title}</p>
                <p className={styles.email}>{email}</p>
                <p className={styles.message}>{message}</p>
            </div>
        </li>
    );
});

function getStyles(theme) {
    switch (theme) {
        case 'dark':
            return styles.dark;
        case 'light':
            return styles.light;
        case 'colorful':
            return styles.colorful;
        default:
            throw new Error(`Unknow theme: ${theme}`);
    }
}

function shapeStyles(theme) {
    switch (theme) {
        case 'modern':
            return styles.modern;
        case 'round':
            return styles.round;
        case 'stick':
            return styles.stick;
        default:
            throw new Error(`Unknow theme: ${theme}`);
    }
}

export default Card;