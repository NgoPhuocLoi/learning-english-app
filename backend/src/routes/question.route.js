const router = require("express").Router();
const QuestionController = require("../controllers/question.controller");
const { asyncHandler } = require("../utils/asyncHandler");

router.get("/:topicId", asyncHandler(QuestionController.getQuestionsOfTopic));
router.get("/test/:level", asyncHandler(QuestionController.getQuestionsOfTest));

module.exports = router;
