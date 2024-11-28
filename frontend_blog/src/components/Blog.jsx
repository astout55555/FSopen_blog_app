import { useState, useRef } from 'react';
import blogService from '../services/blogs';
import Togglable from "./Togglable";
import LikeButton from "./LikeButton";
import DeleteButton from './DeleteButton';

const Blog = ({ blog, user }) => {
  const [likes, setLikes] = useState(blog.likes);

  const blogRef = useRef();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const deleteBlog = async (blog) => {
    console.log(`removing blog with id ${blog.id}`);
    await blogService.remove(blog.id);
    const currentBlogs = await blogService.getAll();
    console.log('blog deleted');
    setBlogs(currentBlogs);
  }

  const deleteButton = (blog) => {
    if (user.name === blog.user.name) {
      return (
        <DeleteButton blog={blog} deleteBlog={deleteBlog} />
      )
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="view" ref={blogRef} >
        {blog.url}
        <br/>
        {likes} <LikeButton blog={blog} setLikes={setLikes} />
        <br/>
        {blog.user.name}
      </Togglable>
      { deleteButton(blog) }
    </div>
  );
}

export default Blog;