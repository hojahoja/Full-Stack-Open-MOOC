import { useParams } from "react-router-dom";
import { useGetAllUsersQuery } from "../features/apiSlice";
import { useSelector } from "react-redux";

const User = () => {
  const { id } = useParams();
  const blogListSize = useSelector((state) => state.blogs.length);

  const { data: users, isSuccess } = useGetAllUsersQuery(blogListSize, {
    selectFromResult: ({ data, isSuccess }) => ({ data, isSuccess }),
  });

  const user = isSuccess ? users.find((u) => u.id === id) : null;

  const userDetails = () => (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
  return <>{isSuccess && userDetails()}</>;
};

export default User;
