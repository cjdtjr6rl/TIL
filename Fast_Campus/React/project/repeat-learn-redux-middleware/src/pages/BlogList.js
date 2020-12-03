import React from "react";
import BlogItem from "./BlogItem";

const BlogList = ({ blogs, onBlogClick }) => (
  <ul>
    {blogs.map((blog) => (
      <BlogItem blog={blog} onBlogClick={onBlogClick} />
    ))}
  </ul>
);

export default BlogList;
