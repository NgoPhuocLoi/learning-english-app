const { NotFoundError } = require("../helpers/error.response");

const handleNotFound = (req, res, next) => {
  const error = new NotFoundError("Route not found!");
  next(error);
};

const handleErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message,
  });
};

module.exports = {
  handleNotFound,
  handleErrors,
};
