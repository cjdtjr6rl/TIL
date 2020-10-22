import React, { memo, useRef } from 'react';
import styles from './card.module.css';

const Card = memo(({ card }) => {
    const DEFAULT_IMAGE = '/images/default_logo.png';
    const {name, company, title, email, message, theme, shape, fileURL} = card;
    const url = fileURL || DEFAULT_IMAGE;
    const prinfRef= useRef();

    function print() {
        console.log(prinfRef.current.outerText + ' 프린트 할거얏!');
    }

    return (
        <li ref={prinfRef} className={`${styles.card} ${getStyles(theme)} ${shapeStyles(shape)}`} onClick={print}>
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
        case 'salmon':
            return styles.salmon;
        case 'blue':
            return styles.blue;
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
        case 'weird':
            return styles.weird;
        default:
            throw new Error(`Unknow theme: ${theme}`);
    }
}

export default Card;