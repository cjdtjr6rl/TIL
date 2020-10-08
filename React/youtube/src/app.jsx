import React from "react";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import VideoList from "./components/video_list/video_list";
import SearchHeader from "./components/search_header/serarch_header";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyCc0PhU0GwXLHb1XBqk0df37OwnHy05ENQ",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader />
      <VideoList videos={videos} />;
    </div>
  );
}

export default App;
