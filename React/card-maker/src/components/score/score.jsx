import React, { useCallback } from 'react';
import Header from "../header/header";
import Select from '../select/select';
import Footer from '../footer/footer';
import styles from './score.module.css';

const Score = ({ authService }) => {
    const onLogout = useCallback(() => {
        authService.logout();
    }, [authService]);
    
    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <Select />
            <div className={styles.container}>
                Score
            </div>
            <Footer />
        </section>
    );
};

export default Score;