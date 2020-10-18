import React from 'react';
import { Link } from 'react-router-dom';
import styles from './select.module.css';

const Select = () => (
    <div className={styles.select}>
        <ul className={styles.ul}>
            <li>
                <Link to="/maker">
                    <button className={styles.button}>Maker</button>
                </Link>
            </li>
            <li>
                <Link to="/score">
                    <button className={styles.button}>Score</button>
                </Link>
            </li>
        </ul>
    </div>
);

export default Select;