const { OKResponse } = require("../helpers/success.response");
const TopicService = require("../services/topic.service");

class TopicController {
  static async getAllTopics(req, res, next) {
    const level = req.query.level;
    const filter = {};
    if (level) filter.level = parseInt(level);
    new OKResponse({
      message: "OK",
      metadata: await TopicService.getAllTopics({
        filter,
        limit: parseInt(req.query.limit) || 50,
      }),
    }).send(res);
  }
}

module.exports = TopicController;
