import React, { memo } from 'react';
import CommentAddForm from '../comment_add_form/comment_add_form';
import Talk from '../talk/talk';
import styles from './comments.module.css';

const Comments = memo(({ myId, authService, comments, createComment }) => (
    <section className={styles.comments}>
        <h1 className={styles.title}>Card Review</h1>
        <CommentAddForm authService={authService} createComment={createComment} />
        <ul className={styles.comment}>
            {Object.keys(comments).map(key => (
                <Talk authService={authService} myId={myId} key={key} comments={comments[key]} />
            ))}
        </ul>
    </section>
));

export default Comments;