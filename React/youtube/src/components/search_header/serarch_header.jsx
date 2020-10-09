import React, { memo } from "react";
import { useRef } from "react";
import styles from "./search_header.module.css";

const SearchHeader = memo(({ onSearch, clickVideo, goToHome }) => {
  // input란의 값에 접근
  const inputRef = useRef();
  // input에서 작성한 값을 props로 가지고 온 onSearch에서 값 전달
  const handleSearch = () => {
    const value = inputRef.current.value;
    onSearch(value);
    inputRef.current.focus();
    clickVideo
      ? (inputRef.current.value = "")
      : (inputRef.current.value = value);
  };

  const onClick = () => {
    handleSearch();
  };

  // input에 enter를 눌렀을 때 form을 사용하지 않아도 가능
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const onGoHome = () => {
    goToHome();
  };
  console.log("Header!!!");

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={onGoHome}>
        <img className={styles.img} src="/images/logo.png" alt="logo" />
        <h1 className={styles.title}>Youtube</h1>
      </div>
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        placeholder="Search.."
        onKeyPress={onKeyPress}
      />
      <button className={styles.button} type="submit" onClick={onClick}>
        <img
          className={styles.buttonImg}
          src="/images/search.png"
          alt="search"
        />
      </button>
    </header>
  );
});

export default SearchHeader;
