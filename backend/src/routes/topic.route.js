const router = require("express").Router();
const TopicController = require("../controllers/topic.controller");
const { authentication } = require("../middlewares/auth");
const { asyncHandler } = require("../utils/asyncHandler");

// router.use(authentication);
router.get("/", asyncHandler(TopicController.getAllTopics));

module.exports = router;
