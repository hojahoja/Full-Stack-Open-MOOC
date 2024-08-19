import { Link, useParams } from "react-router-dom";
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
    <div className="flex flex-col items-center">
      <h2>{`${user.name}'s added blogs`}</h2>
      <ul className="first my-1 w-full text-center">
        {user.blogs.map((b) => (
          <li className="mx-6 my-2 rounded border text-xl hover:bg-slate-50" key={b.id}>
            <Link className="block p-2" to={`/blogs/${b.id}`}>
              {b.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return <>{isSuccess && userDetails()}</>;
};

export default User;
