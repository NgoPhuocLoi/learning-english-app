const router = require("express").Router();
const AccessController = require("../controllers/access.controller");
const { OKResponse } = require("../helpers/success.response");
const { asyncHandler } = require("../utils/asyncHandler");
const passport = require("passport");

router.post("/register", asyncHandler(AccessController.register));
router.post("/login", asyncHandler(AccessController.login));

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  const { token, ...user } = req.user;
  res.cookie("token", token);
  res.writeHead(302, {
    Location: "http://localhost:3000/",
  });

  res.end();
  // new OKResponse({
  //   message: "OK",
  //   metadata: { user, token },
  // }).send(res);
});

module.exports = router;
