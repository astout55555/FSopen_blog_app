import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const LikeButton = ({ blog, setLikes }) => {

  const handleLike = () => {
    const incrementedLikes = blog.likes + 1;
    try {
      blogService.update({ ...blog, likes: incrementedLikes });
      setLikes(incrementedLikes);
    } catch (error) {
      console.error('Uh oh! Like did not work for some reason.');
    }
  }

  return (
    <button onClick={handleLike} >
      Like
    </button>
  );
}

LikeButton.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
  setLikes: PropTypes.func.isRequired,
}

export default LikeButton;