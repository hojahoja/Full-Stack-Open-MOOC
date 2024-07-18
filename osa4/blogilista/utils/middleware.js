const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const tokenExtractor = (request, response, next) => {
  const auth = request.get("authorization");
  const tokenExistsAsBearer = auth && auth.startsWith("Bearer ");
  const token = tokenExistsAsBearer ? auth.replace("Bearer ", "") : null;

  request.token = token;
  next();
};

const userExtractor = async (request, response, next) => {
  //returns error on failure
  const token = jwt.verify(request.token, process.env.SECRET);
  const user = await User.findById(token.id);

  request.user = user;
  next();
};

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
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "missing or invalid token" });
  }
  next(error);
};

module.exports = { unknownEndpoint, errorHandler, tokenExtractor, userExtractor };
