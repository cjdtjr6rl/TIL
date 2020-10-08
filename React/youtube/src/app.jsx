import React from "react";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import VideoList from "./components/video_list/video_list";
import SearchHeader from "./components/search_header/serarch_header";

function App() {
  const [videos, setVideos] = useState([]);

  // search하는 api코드
  const search = (query) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      // query의 값이 search하는 값
      // props에서 넘어갔을 때 값이 들어갈 것임
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=26&q=${query}&type=video&key=AIzaSyCc0PhU0GwXLHb1XBqk0df37OwnHy05ENQ`,
      requestOptions
    )
      .then((response) => response.json())
      // search를 하면 불러오는 video의 id가 같다고 출력
      // 이전의 item들을 전부 spread로 가져오고 id만 새로운 video의 id를 덮어씌워야 함
      .then((result) =>
        result.items.map((item) => ({ ...item, id: item.id.videoId }))
      )
      .then((items) => setVideos(items))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    // 처음 로드할 때 mostPopular의 영상 출력
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=26&key=AIzaSyCc0PhU0GwXLHb1XBqk0df37OwnHy05ENQ",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <VideoList videos={videos} />;
    </div>
  );
}

export default App;
