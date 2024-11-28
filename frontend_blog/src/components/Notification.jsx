const Notification = ({ successMessage, errorMessage }) => {
  const successStyle = {
    backgroundColor: 'green',
    fontSize: 16,
    borderStyle: 'solid',
  };

  const errorStyle = {
    backgroundColor: 'red',
    fontSize: 16,
    borderStyle: 'solid',
  };

  if (successMessage) {
    return (
      <div style={successStyle}>{successMessage}</div>
    );
  } else if (errorMessage) {
    return (
      <div style={errorStyle}>{errorMessage}</div>
    );
  }
}

export default Notification;