const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog ? res.json(blog) : res.status(404).end();
});

blogsRouter.post("/", async (req, res) => {
  const token = jwt.verify(req.token, process.env.SECRET);
  if (!token.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  const user = await User.findById(token.id);

  const blog = new Blog({ ...req.body, user: user.id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const token = jwt.verify(req.token, process.env.SECRET);
  if (!token.id) {
    return res.status(401).json({ error: "invalid token" });
  }
  const blog = await Blog.findById(req.params.id);

  if (token.id === blog.user.toString()) {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } else {
    return res
      .status(401)
      .json({ error: `${token.username} is not authorized to delete this entry` });
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const updatedNote = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true, runValidators: true, context: "query" }
  );
  updatedNote ? res.json(updatedNote) : res.status(404).end();
});

module.exports = blogsRouter;
