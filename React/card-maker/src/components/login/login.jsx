import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./login.module.css";

const Login = ({ authService }) => {
  // history를 통해서 /maker로 들어가도록 push 해줌
  // 그 때 특정 id로 로그인을 했기 때문에 id를 userId로 지정 해줌
  const history = useHistory();
  const goToMaker = (userId) => {
    history.push({
      pathname: "/maker",
      state: { id: userId },
    });
  };

  const onLogin = (e) => {
    // props로 가져온 authService에서 login을 불러와 로그인 함
    authService
      .login(e.currentTarget.textContent)
      // data를 받아오게 된다면 goToMaker 함수를 실행시켜 로그인한 id의 data.user.uid를 불러와 저장함
      .then((data) => goToMaker(data.user.uid));
  };

  // 로그인이 되어 있을 때 user의 데이터가 있을 경우 goToMaker 실행하여 user.uid를 전달
  useEffect(() => {
    authService //
      .onAuthChange((user) => {
        // null이면 알아서 로그인 화면
        user && goToMaker(user.uid);
      });
  });

  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
