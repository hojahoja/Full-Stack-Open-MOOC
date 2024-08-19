import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../features/apiSlice";
import { useSelector } from "react-redux";

const UserList = () => {
  const blogListSize = useSelector((state) => state.blogs.length);

  const { data: users, isSuccess } = useGetAllUsersQuery(blogListSize, {
    selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data }),
  });

  const userTable = () => (
    <table className="mx-auto min-w-96 table-auto border-collapse lg:w-full">
      <thead className="contents">
        <tr className="flex items-center justify-stretch border">
          <th className="flex-1 text-center">Users</th>
          <th className="flex-1 text-center">blogs created</th>
        </tr>
      </thead>
      <tbody className="contents">
        {users.map((u) => (
          <tr className="flex justify-center border  hover:bg-slate-50" key={u.id}>
            <td className="flex-1 py-2.5 text-center">
              <Link
                className={`block text-[#0000EE] underline visited:text-[#551A8B]
                  hover:no-underline active:text-green-900`}
                to={`/users/${u.id}`}>
                {u.name}
              </Link>
            </td>
            <td className="flex-1 py-2.5 text-center">
              <Link className="block" to={`/users/${u.id}`}>
                {u.blogs.length}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return <div className="px-6">{isSuccess && userTable()}</div>;
};

export default UserList;
