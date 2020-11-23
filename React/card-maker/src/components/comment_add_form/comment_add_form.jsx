import React, { useEffect, useState } from "react";
import styles from "./comment_add_form.module.css";
import { useRef } from "react";
import Button from "../button/button";
import { useHistory } from "react-router-dom";

const CommentAddForm = ({ authService, createComment }) => {
  const formRef = useRef();
  const commentRef = useRef();
  const historyState = useHistory();
  const [userId, setUserId] = useState(historyState && historyState.id);
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, [authService, userId]);

  const onSubmit = (e) => {
    e.preventDefault();
    const comment = {
      id: Date.now(),
      comment: commentRef.current.value || "",
      userId: userId || "",
    };
    formRef.current.reset();
    createComment(comment);
  };

  return (
    <form ref={formRef} className={styles.form}>
      <textarea ref={commentRef} className={styles.textarea} name="comment" placeholder="Review" />
      <div className={styles.button}>
        <Button name="입력" onClick={onSubmit} />
      </div>
    </form>
  );
};

export default CommentAddForm;
