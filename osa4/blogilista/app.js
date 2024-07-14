const express = require("express");
const app = express();
require("express-async-errors");
//const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");
const { MONGODB_URI } = require("./utils/config");

mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("Error connecting to MongoDB:", error.message));

//app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  morgan.token("body", (req) => (req.method === "POST" ? JSON.stringify(req.body) : undefined));
  app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
}

app.use("/api/blogs", blogsRouter);

module.exports = app;
