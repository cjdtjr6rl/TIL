import React, { memo, useRef } from 'react';
import styles from './card.module.css';

const Card = memo(({ card }) => {
    const DEFAULT_IMAGE = '/images/default_logo.png';
    const {name, company, email, message, design, theme1, theme2, shape, fileURL, address, comnumber, fax, number, position} = card;
    const url = fileURL || DEFAULT_IMAGE;
    const printRef= useRef();

    function print() {
        const html = document.querySelector('html');
        const printContents = printRef.current.innerHTML;
        const printUl = document.createElement('ul');
        const printDiv1 = document.createElement('li');
        printDiv1.className = printRef.current.className;
        const printDiv2 = document.createElement('li');
        printDiv2.className = printRef.current.className;
        const printDiv3 = document.createElement('li');
        printDiv3.className = printRef.current.className;
        const printDiv4 = document.createElement('li');
        printDiv4.className = printRef.current.className;
        const printDiv5 = document.createElement('li');
        printDiv5.className = printRef.current.className;
        

        printUl.style.display = 'flex';
        printUl.style.flexDirection = 'column';
        printUl.style.alignItems = 'center';
        printUl.style.padding = 0;

        printDiv1.style.boxShadow = 'none';
        printDiv1.style.border = 0;
        printDiv2.style.boxShadow = 'none';
        printDiv2.style.border = 0;
        printDiv3.style.boxShadow = 'none';
        printDiv3.style.border = 0;
        printDiv4.style.boxShadow = 'none';
        printDiv4.style.border = 0;
        printDiv5.style.boxShadow = 'none';
        printDiv5.style.border = 0;

        html.appendChild(printUl);
        printUl.appendChild(printDiv1);
        printDiv1.innerHTML = printContents;
        printUl.appendChild(printDiv2);
        printDiv2.innerHTML = printContents;
        printUl.appendChild(printDiv3);
        printDiv3.innerHTML = printContents;
        printUl.appendChild(printDiv4);
        printDiv4.innerHTML = printContents;
        printUl.appendChild(printDiv5);
        printDiv5.innerHTML = printContents;

        document.body.style.display = 'none';
        window.print();
        document.body.style.display = 'block';
        printUl.style.display = 'none';
    }

    return (
        <>
            {
                design === 'static' ?
                (<li ref={printRef} className={styles.groupcard} onClick={print}>
                    <dt id="modal-body" className={`${styles.card} ${getStyles(theme1)} ${shapeStyles(shape)}`}>
                        <img className={styles.avatar} src={url} alt="profile"/>
                        <div className={styles.front}>
                            <h1 className={styles.name}>
                                <span className={styles.position}>{position && `${position} | `}</span>
                                {name}
                            </h1>
                            <p className={styles.company}>{company}</p>
                            <p className={styles.address}>{address}</p>
                            <div className={styles.content}>
                                <p className={styles.number}><b>{ number && `Mobile: `}</b>{number}</p>
                                <p className={styles.comnumber}><b>{ comnumber && `Tel: `}</b>{comnumber}</p>
                                <p className={styles.fax}><b>{ fax && `Fax: `}</b>{fax}</p>
                                <p className={styles.email}><b>{ email && `Email: `}</b>{email}</p>
                            </div>
                        </div>
                    </dt>
                    <dt className={`${styles.card} ${getStyles(theme2)} ${shapeStyles(shape)}`}>
                        <div className={styles.back}>
                            <p className={styles.message}>{message}</p>
                        </div>
                    </dt>
                </li>) : design === 'simple' ?
                (<li ref={printRef} className={styles.groupcard} onClick={print}>
                    <dt id="modal-body" className={`${styles.card} ${getStyles(theme1)} ${shapeStyles(shape)}`}>
                        {address}, {comnumber}
                    </dt>
                    <dt className={`${styles.card} ${getStyles(theme2)} ${shapeStyles(shape)}`}>
                        {fax}, {number}, {position}
                    </dt>
                </li>) : design === 'manyInfo' ?
                (<li ref={printRef} className={styles.groupcard} onClick={print}>
                    <dt id="modal-body" className={`${styles.card} ${getStyles(theme1)} ${shapeStyles(shape)}`}>
                        {address}, {comnumber}
                    </dt>
                    <dt className={`${styles.card} ${getStyles(theme2)} ${shapeStyles(shape)}`}>
                        {fax}, {number}, {position}
                    </dt>
                </li>) : <li>이상하게 적지 마세요!!</li>
            }
        </>
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
        case 'gold':
            return styles.gold;
        default:
            throw new Error(`Unknow theme: ${theme}`);
    }
}

function shapeStyles(shape) {
    switch (shape) {
        case 'modern':
            return styles.modern;
        case 'round':
            return styles.round;
        case 'stick':
            return styles.stick;
        default:
            throw new Error(`Unknow theme: ${shape}`);
    }
}

export default Card;