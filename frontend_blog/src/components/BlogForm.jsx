import { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs, setSuccessMessage, setErrorMessage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      await blogService.create(newBlog);
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
      setSuccessMessage(`a new blog ${title} by ${author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch(error) {
      console.error(error.message);
      setErrorMessage('error: blog not added');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input name="title"
            type="text"
            value={ title }
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input name="author"
            type="text"
            value={ author }
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input name="url"
            type="text"
            value={ url }
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default BlogForm;