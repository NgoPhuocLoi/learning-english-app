const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { PrismaClient } = require("@prisma/client");
const { generateAccessToken } = require("../utils/auth");

const prisma = new PrismaClient();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/v1/api/access/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existUser = await prisma.user.findUnique({
        where: {
          id: profile.id,
        },
        select: {
          id: true,
          email: true,
          host: true,
          current_level: true,
        },
      });

      if (existUser) {
        const token = generateAccessToken(existUser);
        return done(null, { ...existUser, token });
      }

      const user = await prisma.user.create({
        data: {
          id: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          password: profile.id,
        },
        select: {
          id: true,
          email: true,
          host: true,
          current_level: true,
        },
      });
      const token = generateAccessToken(user);
      done(null, { ...user, token });
    }
  )
);
