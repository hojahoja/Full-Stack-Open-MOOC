import { useSelector } from "react-redux";

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification);

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

  return (
    <div
      className={`rounded-xl border-2 p-2 text-center text-xl font-semibold
        ${isError ? "border-red-600 bg-red-50" : "border-green-800 bg-green-50"}`}>
      {message}
    </div>
  );
};

export default Notification;
