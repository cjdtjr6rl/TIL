import React, { useCallback, useState } from "react";
import BlogList from "./BlogList";
import SearchHeader from "./SearchHeader";

function SearchPage({ naver }) {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const selectBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const search = useCallback(
    (query) => {
      naver //
        .search(query)
        .then((blog) => {
          setBlogs(blog);
          // 새롭게 search 했을 때 search하는 값을 null로 초기화
          setSelectedBlog(null);
        });
    },
    [naver]
  );
  return (
    <div>
      <SearchHeader onSearch={search} clickVideo={selectedBlog} />
      <section>
        <div>
          <BlogList blogs={blogs} onBlogClick={selectBlog} />
        </div>
      </section>
    </div>
  );
}

export default SearchPage;
