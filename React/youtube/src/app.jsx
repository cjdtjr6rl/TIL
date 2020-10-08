import React from "react";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import VideoList from "./components/video_list/video_list";
import SearchHeader from "./components/search_header/serarch_header";

// index에서 youtube를 한번 호출한 constructor를 props로 가져와 사용
function App({ youtube }) {
  const [videos, setVideos] = useState([]);

  // search하는 api코드
  const search = (query) => {
    youtube //
      .search(query)
      .then((videos) => setVideos(videos));
  };

  useEffect(() => {
    youtube //
      .mostPopular()
      .then((videos) => setVideos(videos));
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <VideoList videos={videos} />;
    </div>
  );
}

export default App;
