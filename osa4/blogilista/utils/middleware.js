const logger = require("./logger");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (
    error.name === "MongoServerError" &&
    (error.message.includes("E11000 duplicate key error collection: BlogApp.users") ||
      error.message.includes("E11000 duplicate key error collection: TestBlogApp.users"))
  ) {
    return response.status(400).json({ error: "username has to be unique" });
  }
  next(error);
};

module.exports = { unknownEndpoint, errorHandler };