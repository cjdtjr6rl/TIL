import React from "react";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import VideoList from "./components/video_list/video_list";
import SearchHeader from "./components/search_header/serarch_header";
import VideoDetail from "./components/video_detail/video_detail";
import { useCallback } from "react";

// index에서 youtube를 한번 호출한 constructor를 props로 가져와 사용
function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  // search하는 api코드
  const search = useCallback(
    (query) => {
      youtube //
        .search(query)
        .then((videos) => {
          setVideos(videos);
          // 새롭게 search 했을 때 search하는 값을 null로 초기화
          setSelectedVideo(null);
        });
    },
    [youtube]
  );

  const goToHome = useCallback(() => {
    youtube //
      .mostPopular()
      .then((videos) => setVideos(videos));
    setSelectedVideo(null);
  }, [youtube]);

  useEffect(() => {
    goToHome();
  }, [goToHome]);

  return (
    <div className={styles.app}>
      <SearchHeader
        onSearch={search}
        clickVideo={selectedVideo}
        goToHome={goToHome}
      />
      <section className={styles.content}>
        {/* selectedVideo가 있다면 div가 보여져야 하고 없다면 보여지면 안됨 */}
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            // selectedVideo가 없을 때 list로 클릭하여 있을 때 grid로 props 전달
            display={selectedVideo ? "list" : "grid"}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
