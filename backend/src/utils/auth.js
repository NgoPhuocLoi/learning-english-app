const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (hashedPass, password) => {
  return await bcrypt.compare(password, hashedPass);
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = {
  hashPassword,
  generateAccessToken,
  generateRefreshToken,
  comparePassword,
};
