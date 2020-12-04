import React, { useState } from "react";
import { Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";
import CounterContainer from "./containers/CounterContainer";
import SearchPage from "./pages/SearchPage";
import Axios from "axios";

function App() {
  const clientId = process.env.REACT_APP_NAVER_API_KEY;
  const clientSecret = process.env.REACT_APP_NAVER_SECRET_KEY;

  const apiURL = `https://openapi.naver.com/v1/search/blog.json`;

  const [naver, setNaver] = useState(null);
  const onClick = async () => {
    try {
      const response = await Axios.get(apiURL, {
        params: { query: "신촌 피자몰", display: 10 },
        headers: {
          "X-Naver-Client-Id": clientId,
          "X-Naver-Client-Secret": clientSecret,
        },
      });
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
        {clientId} / {clientSecret}
      </div>
    </>
  );
}

export default App;
