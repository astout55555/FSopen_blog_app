import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
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
    createBlog(newBlog);
    setTitle('');
    setAuthor('');
    setURL('');
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