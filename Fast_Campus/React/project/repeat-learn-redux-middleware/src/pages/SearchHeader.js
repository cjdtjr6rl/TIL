import React, { memo } from "react";
import { useRef } from "react";

const SearchHeader = memo(({ onSearch, clickVideo, goToHome }) => {
  // input란의 값에 접근
  const inputRef = useRef();
  // input에서 작성한 값을 props로 가지고 온 onSearch에서 값 전달
  const handleSearch = () => {
    const value = inputRef.current.value;
    onSearch(value);
    inputRef.current.focus();
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
    inputRef.current.value = "";
  };

  return (
    <header>
      <div onClick={onGoHome}>
        <img src="/images/logo.png" alt="logo" />
        <h1>Youtube</h1>
      </div>
      <input
        ref={inputRef}
        type="search"
        placeholder="Search.."
        onKeyPress={onKeyPress}
      />
      <button type="submit" onClick={onClick}>
        클릭
      </button>
    </header>
  );
});

export default SearchHeader;
