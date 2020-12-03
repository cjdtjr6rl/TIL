import React from "react";
import { Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";
import CounterContainer from "./containers/CounterContainer";
import SearchPage from "./pages/SearchPage";

function App({ naver }) {
  return (
    <>
      <CounterContainer />
      <Route path="/" component={PostListPage} exact={true} />
      <Route path="/:id" component={PostPage} />
      <Route path="/search">
        <SearchPage naver={naver} />
      </Route>
    </>
  );
}

export default App;
