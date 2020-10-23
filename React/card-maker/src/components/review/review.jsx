import React, { useState, useEffect, useCallback, memo } from 'react';
import Header from "../header/header";
import Select from '../select/select';
import Footer from '../footer/footer';
import styles from './review.module.css';
import Comments from '../comments/comments';
import { useHistory } from 'react-router-dom';

const Review = memo(({ authService }) => {
    const historyState = useHistory();
    const [userId, setUserId] = useState(historyState && historyState.id);
    useEffect(() => {
        authService.onAuthChange((user) => {
            if (user) {
                setUserId(user.uid);
            }
        });
    }, [authService, userId]);

    const [comments, setUsers] = useState([
        {
            id: '1',
            name: 'Lee Jun Hyoung',
            comment: 'WOW Amazing :)',
            userId: null,
        },
        {
            id: '2',
            name: 'Yong Bum Jung',
            comment: 'It is very gorgeous!',
            userId: null,
        },
    ]);

    const createComment = (comment) => {
        setUsers(comments => {
            const updated = {...comments};
            updated[comment.id] = comment;
            return updated;
        });
    }

    const onLogout = useCallback(() => {
        authService.logout();
    }, [authService]);
    
    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <Select />
            <section className={styles.container}>
                <Comments authService={authService} comments={comments} createComment={createComment} myId={userId} />
            </section>
            <Footer />
        </section>
    );
});

export default Review;