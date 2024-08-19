import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogForm from "./BlogForm";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="flex flex-col">
      <BlogForm />
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="mx-6 my-1 rounded border text-center text-xl hover:bg-slate-50">
          <Link className="block w-full p-2" to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
