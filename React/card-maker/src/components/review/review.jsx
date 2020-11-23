import React, { useState, useEffect, useCallback, memo } from "react";
import Header from "../header/header";
import Select from "../select/select";
import Footer from "../footer/footer";
import styles from "./review.module.css";
import Comments from "../comments/comments";
import { useHistory } from "react-router-dom";
import UserList from "../userlist/userlist";

const Review = memo(({ authService, commentRepository, userRepository, division }) => {
  const historyState = useHistory();
  const [comments, setUsers] = useState({});
  const [users, setUser] = useState({});
  const [userId, setUserId] = useState(historyState && historyState.id);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = userRepository.syncUsers(userId, (users) => {
      setUser(users);
    });
    return () => stopSync();
  }, [userRepository, userId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = commentRepository.syncComment(userId, (comments) => {
      setUsers(comments);
    });
    return () => stopSync();
  }, [commentRepository, userId]);

  // review 쓴 사용자 확인
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, [authService]);

  const createComment = (comment) => {
    setUsers((comments) => {
      const updated = { ...comments };
      updated[comment.id] = comment;
      return updated;
    });
    commentRepository.saveComment(userId, comment);
  };

  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <Select />
      <h1 className={styles.title}>Review & Talk</h1>
      <section className={styles.container}>
        <UserList users={users} myId={userId} />
        <Comments authService={authService} comments={comments} createComment={createComment} myId={userId} division={division} />
      </section>
      <Footer />
    </section>
  );
});

export default Review;
