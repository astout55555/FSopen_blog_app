import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userDetails = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userDetails)
      );

      blogService.setToken(userDetails.token);
      setUser(userDetails);
      setSuccessMessage('You are now logged in!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  );

  const logoutForm = () => {
    return (
      <button onClick={handleLogout}>
        logout
      </button>
    );
  }

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setBlogs([]);
    setSuccessMessage('You have logged out');
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  }

  if (user === null) {
    return (
      <div>
        <Notification successMessage={successMessage} errorMessage={errorMessage} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {logoutForm()}
      <BlogForm blogs={blogs} setBlogs={setBlogs}
        setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App