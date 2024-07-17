const express = require("express");
const app = express();
require("express-async-errors");
//const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const { MONGODB_URI } = require("./utils/config");

mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("Error connecting to MongoDB:", error.message));

//app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "dev") {
  morgan.token("body", (req) => (req.method === "POST" ? JSON.stringify(req.body) : undefined));
  app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
} else if (process.env.NODE_ENV !== "test") {
  app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
}

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
