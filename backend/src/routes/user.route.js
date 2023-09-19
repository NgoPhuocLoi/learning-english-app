const UserController = require("../controllers/user.controller");
const { authentication } = require("../middlewares/auth");
const { asyncHandler } = require("../utils/asyncHandler");

const router = require("express").Router();

// router.use(authentication);
router.get("/", authentication, asyncHandler(UserController.getCurrentUser));
router.put(
  "/update-progress",
  authentication,
  asyncHandler(UserController.updateProgress)
);
router.put(
  "/update-level",
  authentication,
  asyncHandler(UserController.updateLevel)
);

module.exports = router;
