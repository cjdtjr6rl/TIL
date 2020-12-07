import React, { useState } from "react";
import { Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";
import CounterContainer from "./containers/CounterContainer";
import SearchPage from "./pages/SearchPage";
import Axios from "axios";

function App() {
  const myHeaders = new Headers();
  myHeaders.append("X-Naver-Client-Id", process.env.REACT_APP_NAVER_API_KEY);
  myHeaders.append(
    "X-Naver-Client-Secret",
    process.env.REACT_APP_NAVER_SECRET_KEY
  );
  myHeaders.append("Access-Control-Allow-Origin", "*");

  const apiURL = `https://openapi.naver.com/v1/search/blog.json`;

  const [naver, setNaver] = useState(null);
  const onClick = async () => {
    try {
      const response = await Axios.get(apiURL, {
        method: "GET",
        params: { query: "신촌 피자몰", display: 10 },
        headers: myHeaders,
        redirect: "follow",
      });
      console.log(response.data);
      setNaver(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <CounterContainer />
      <Route path="/" component={PostListPage} exact={true} />
      <Route path="/:id" component={PostPage} />
      {/* <SearchPage naver={naver} /> */}
      <div>
        <button onClick={onClick}>불러오기</button>
        {naver && <textarea value={JSON.stringify(naver, null, 2)} />}
      </div>
    </>
  );
}

export default App;
