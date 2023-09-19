const express = require("express");
const cors = require("cors");
const { handleNotFound, handleErrors } = require("./middlewares/handleError");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

const app = express();

require("./services/passport");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "adlkndaslkdsldlajk",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// mysql.connect();

app.use("/v1/api", require("./routes"));

app.use(handleNotFound);
app.use(handleErrors);

module.exports = app;
