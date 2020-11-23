import React, { memo } from "react";
import CommentAddForm from "../comment_add_form/comment_add_form";
import Talk from "../talk/talk";
import styles from "./comments.module.css";

const Comments = memo(({ myId, authService, comments, createComment, division }) => {
  return (
    <>
      {division === "1" ? (
        <section className={styles.comments}>
          <CommentAddForm authService={authService} createComment={createComment} />
          <ul className={styles.comment}>
            {Object.keys(comments).map((key) => (
              <Talk myId={myId} key={key} comments={comments[key]} />
            ))}
          </ul>
        </section>
      ) : division === "2" ? (
        <section className={styles.comments}>
          <CommentAddForm authService={authService} createComment={createComment} />
          <div className={styles.talking}>나랑 Bum Jung Yong의 대화</div>
        </section>
      ) : division === "3" ? (
        <section className={styles.comments}>
          <CommentAddForm authService={authService} createComment={createComment} />
          <div className={styles.talking}>나랑 Jee Hee Shim의 대화</div>
        </section>
      ) : division === "4" ? (
        <section className={styles.comments}>
          <CommentAddForm authService={authService} createComment={createComment} />
          <div className={styles.talking}>나랑 Jun Hyeok Kim의 대화</div>
        </section>
      ) : division === "5" ? (
        <section className={styles.comments}>
          <CommentAddForm authService={authService} createComment={createComment} />
          <div className={styles.talking}>나랑 Jun Hyoung Lee의 대화</div>
        </section>
      ) : (
        <div>계정을 등록해주세요.</div>
      )}
    </>
  );
});

export default Comments;
