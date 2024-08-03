const Notification = ({ message, isError = false }) => {
  if (message === null) return null;
  const infoStyle = {
    color: "black",
    background: "lightgrey",
    fontSize: 20,
    borderColor: "green",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={isError ? { ...infoStyle, borderColor: "red" } : infoStyle}>{message}</div>;
};

export default Notification;
