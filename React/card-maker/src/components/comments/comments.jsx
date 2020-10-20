import React from 'react';
import CommentAddForm from '../comment_add_form/comment_add_form';
import Talk from '../talk/talk';
import styles from './comments.module.css';

const Comments = ({ comments, createComment }) => (
    <section className={styles.comments}>
        <h1 className={styles.title}>Card Review</h1>
        <CommentAddForm createComment={createComment} />
        <ul className={styles.comment}>
            {Object.keys(comments).map(key => (
                <Talk key={key} comments={comments[key]} />
            ))}
        </ul>
    </section>
);

export default Comments;