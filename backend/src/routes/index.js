const router = require("express").Router();

router.use("/access", require("./access.route"));
router.use("/topic", require("./topic.route"));
router.use("/question", require("./question.route"));
router.use("/user", require("./user.route"));

module.exports = router;
