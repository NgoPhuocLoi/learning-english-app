const { PrismaClient } = require("@prisma/client");
const {
  hashPassword,
  generateAccessToken,
  generateRefreshToken,
  comparePassword,
} = require("../utils/auth");
const {
  BadRequestError,
  AuthFailureError,
} = require("../helpers/error.response");

const prisma = new PrismaClient();

class AccessService {
  static async register({ email, password, name }) {
    const holdUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (holdUser) throw new BadRequestError("Email has already been used!");

    const newUser = await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password),
        name,
      },
      select: {
        id: true,
        email: true,
        host: true,
        password: false,
        name: true,
      },
    });
    const payload = {
      id: newUser.id,
      email: newUser.email,
      host: newUser.host,
    };
    const tokens = {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };

    return {
      user: newUser,
      tokens,
    };
  }

  static async login({ email, password }) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new AuthFailureError("User is not registered!");
    const matchedPass = await comparePassword(user.password, password);

    if (!matchedPass) throw new AuthFailureError("Incorrect password!");
    const payload = {
      id: user.id,
      email: user.email,
      host: user.host,
    };
    const tokens = {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };
    const { password: a, ...userInfo } = user;
    return {
      user: userInfo,
      tokens,
    };
  }
}

module.exports = AccessService;
