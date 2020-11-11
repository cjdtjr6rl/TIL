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
                <div>대화방 1</div>
            </section>) : division === '3' ?
            (<section className={styles.comments}>
                <CommentAddForm authService={authService} createComment={createComment} />
                <div>대화방 2</div>
            </section>) : division === '4' ?
            (<section className={styles.comments}>
                <CommentAddForm authService={authService} createComment={createComment} />
                <div>대화방 3</div>
            </section>) : division === '5' ?
            (<section className={styles.comments}>
                <CommentAddForm authService={authService} createComment={createComment} />
                <div>대화방 4</div>
            </section>) : <div>계정을 등록해주세요.</div>
            }
        </>
    );
});

export default Comments;