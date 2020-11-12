import React, { memo } from 'react';
import CommentAddForm from '../comment_add_form/comment_add_form';
import Talk from '../talk/talk';
import styles from './comments.module.css';

const Comments = memo(({ myId, authService, comments, createComment, division }) => {
    return (
        <>
            { division === '1' ?
            (<section className={styles.comments}>
                <CommentAddForm authService={authService} createComment={createComment} />
                <ul className={styles.comment}>
                    {Object.keys(comments).map(key => (
                        <Talk authService={authService} myId={myId} key={key} comments={comments[key]} division={division} />
                    ))}
                </ul>
            </section>) : division === '2' ?
            (<section className={styles.comments}>
                <CommentAddForm authService={authService} createComment={createComment} />
                <div className={styles.talking}>나랑 7ncPqnKXWJgY3cwTSA8wa2vOEP22얘랑 대화</div>
            </section>) : division === '3' ?
            (<section className={styles.comments}>
                <CommentAddForm authService={authService} createComment={createComment} />
                <div className={styles.talking}>나랑 hfR91CN8nyb8pLDnj4GGKENNUYk1 대화</div>
            </section>) : division === '4' ?
            (<section className={styles.comments}>
                <CommentAddForm authService={authService} createComment={createComment} />
                <div className={styles.talking}>나랑 FA4cFb1v0yV0u2AUelp6GthI1Yf2 대화</div>
            </section>) : division === '5' ?
            (<section className={styles.comments}>
                <CommentAddForm authService={authService} createComment={createComment} />
                <div className={styles.talking}>나랑 xLvrwgNN3Zgxpr26oCbA6ouL4Ci2 대화</div>
            </section>) : <div>계정을 등록해주세요.</div>
            }
        </>
    );
});

export default Comments;