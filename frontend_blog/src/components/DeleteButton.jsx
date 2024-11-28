const DeleteButton = ({ blog, deleteBlog }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete blog: "${blog.title}"?`)) {
      try {
        deleteBlog(blog);
      } catch (error) {
        console.error(`Whoops! Error: ${error.message}`);
      }
    }
  }

  return (
    <button onClick={handleDelete} >delete</button>
  );
}

export default DeleteButton;