const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1 });
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { password, ...body } = req.body;
  if (!password || password.length < 3) {
    return res.status(400).json({ error: "malformatted password" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ ...body, passwordHash });
  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

//Temporary testing method
//usersRouter.delete("/", async (req, res) => {
//  await User.deleteMany({});
//  res.status(418).end();
//});

module.exports = usersRouter;
