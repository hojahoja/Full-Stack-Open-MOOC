const Notification = ({ message, isError }) => {
  if (message === null) return null;
  const infoStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div style={isError ? { ...infoStyle, color: "red" } : infoStyle}>
      {message}
    </div>
  );
};

export default Notification;
