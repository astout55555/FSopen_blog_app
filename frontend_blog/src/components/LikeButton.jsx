import blogService from "../services/blogs";

const LikeButton = ({blog, setLikes}) => {

  const handleLike = () => {
    const incrementedLikes = blog.likes + 1;
    try {
      blogService.update({...blog, likes: incrementedLikes });
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

export default LikeButton;