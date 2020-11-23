import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./usertalk.module.css";

const UserTalk = memo(({ myId, user }) => {
  const [target, setTarget] = useState("");
  const { user_id, name } = user;

  useEffect(() => {
    console.log(target);
  }, [target]);

  const onClick = (e) => {
    setTarget(e.target.value);
  };

  return (
    <>
      {user_id !== myId ? (
        <Link className={styles.link} to={`/${user_id}`}>
          <li className={styles.user} value={name} onClick={onClick}>
            {name}
          </li>
        </Link>
      ) : (
        <div className={styles.none}></div>
      )}
    </>
  );
});

export default UserTalk;
