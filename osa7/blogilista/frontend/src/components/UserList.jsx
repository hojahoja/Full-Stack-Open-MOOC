import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../features/apiSlice";
import { useSelector } from "react-redux";

const UserList = () => {
  const blogListSize = useSelector((state) => state.blogs.length);

  const { data: users, isSuccess } = useGetAllUsersQuery(blogListSize, {
    selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data }),
  });

  const userTable = () => (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>
              <Link to={`/users/${u.id}`}>{u.name}</Link>
            </td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2>Users</h2>
      {isSuccess && userTable()}
    </div>
  );
};

export default UserList;
