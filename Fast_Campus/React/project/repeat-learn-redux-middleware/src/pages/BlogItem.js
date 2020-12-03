import React from "react";
import { memo } from "react";

const BlogItem = memo(({ blog, onBlogClick }) => {
  return (
    <li onClick={() => onBlogClick(blog)}>
      <div>
        <div>
          <p>{blog.title}</p>
          <p>{blog.description}</p>
          <p>{blog.bloggername}</p>
        </div>
      </div>
    </li>
  );
});

export default BlogItem;
