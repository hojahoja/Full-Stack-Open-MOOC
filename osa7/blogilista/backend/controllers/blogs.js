const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog ? res.json(blog) : res.status(404).end();
});

blogsRouter.post("/", userExtractor, async (req, res) => {
  const user = req.user;

  const blog = new Blog({ ...req.body, user: user.id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.post("/:id/comments", async (req, res) => {
  const comment = req.body.comment;
  const commentedBlog = await Blog.findById(req.params.id);

  commentedBlog.comments = commentedBlog.comments.concat(comment);
  await commentedBlog.save();
  res.status(201).json(commentedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (req, res) => {
  const blogToDelete = req.params.id;
  const user = req.user;

  if (user.blogs.includes(blogToDelete)) {
    await Blog.findByIdAndDelete(blogToDelete);
    user.blogs = user.blogs.filter((blog) => blog.toString() !== blogToDelete);
    await user.save();
  }
  res.status(204).end();
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
