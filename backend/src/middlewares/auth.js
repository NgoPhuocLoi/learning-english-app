const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utils/asyncHandler");
const { AuthFailureError } = require("../helpers/error.response");
const authentication = asyncHandler(async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) throw new AuthFailureError("Missing token!");

  const accessToken = bearerToken.split(" ")[1];

  if (!accessToken) throw new AuthFailureError("Invalid token");

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AuthFailureError("Invalid Token");
  }
});

module.exports = {
  authentication,
};
