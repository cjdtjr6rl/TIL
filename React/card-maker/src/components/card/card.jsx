import React, { memo, useRef } from 'react';
import styles from './card.module.css';

const Card = memo(({ card }) => {
    const DEFAULT_IMAGE = '/images/default_logo.png';
    const {name, company, title, email, message, theme, shape, fileURL} = card;
    const url = fileURL || DEFAULT_IMAGE;
    const prinfRef= useRef();

    function print() {
        const html = document.querySelector('html');
        const printContents = prinfRef.current.innerHTML;
        const printDiv = document.createElement('li');
        printDiv.className = "print-div";
        printDiv.style.display = 'flex';
        printDiv.style.alignItems = 'center';
        printDiv.style.width = '100%';
        printDiv.style.marginBottom = '0.5em';
        printDiv.style.padding =  '0.2em 0';
        printDiv.style.boxShadow = '6px 6px 8px 0px makerShadow';
        printDiv.style.maxWidth = '25rem';

        html.appendChild(printDiv);
        printDiv.innerHTML = printContents;
        document.body.style.display = 'none';
        window.print();
        document.body.style.display = 'block';
        printDiv.style.display = 'none';
    }

    return (
        <li id="modal-body" ref={prinfRef} className={`${styles.card} ${getStyles(theme)} ${shapeStyles(shape)}`} onClick={print}>
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