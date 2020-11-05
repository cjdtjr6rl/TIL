import React, { memo, useRef } from 'react';
import styles from './card.module.css';

const Card = memo(({ card }) => {
    const DEFAULT_IMAGE = '/images/default_logo.png';
    const {name, company, title, email, message, theme, shape, fileURL} = card;
    const url = fileURL || DEFAULT_IMAGE;
    const printRef= useRef();

    function print() {
        const html = document.querySelector('html');
        const printContents = printRef.current.innerHTML;
        const printUl = document.createElement('ul');
        const printDiv = document.createElement('li');
        printDiv.className = printRef.current.className;

        printUl.style.display = 'flex';
        printUl.style.flexDirection = 'column';
        printUl.style.alignItems = 'center';
        printUl.style.padding = 0;

        printDiv.style.boxShadow = 'none';
        printDiv.style.border = 0;

        html.appendChild(printUl);
        printUl.appendChild(printDiv);
        printDiv.innerHTML = printContents;
        document.body.style.display = 'none';
        window.print();
        document.body.style.display = 'block';
        printUl.style.display = 'none';
    }

    return (
        <li ref={printRef} className={styles.groupcard} onClick={print}>
            <dt id="modal-body" className={`${styles.card} ${getStyles(theme)} ${shapeStyles(shape)}`}>
                <img className={styles.avatar} src={url} alt="profile"/>
                <div className={styles.info}>
                    <h1 className={styles.name}>{name}</h1>
                    <p className={styles.company}>{company}</p>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.email}><b>{ email && `Email: `}</b>{email}</p>
                    <p className={styles.message}>{message}</p>
                </div>
            </dt>
            <dt className={`${styles.card} ${getStyles(theme)} ${shapeStyles(shape)}`}>
                <div className={styles.info}>
                    <p className={styles.name}>{name}</p>
                </div>
            </dt>
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