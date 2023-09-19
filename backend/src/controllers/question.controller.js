const { OKResponse } = require("../helpers/success.response");
const QuestionService = require("../services/question.service");

class QuestionController {
  static async getQuestionsOfTopic(req, res, next) {
    const topicId = req.params.topicId;
    new OKResponse({
      message: "OK",
      metadata: await QuestionService.getByTopicId(topicId, +req.query.type),
    }).send(res);
  }

  static async getQuestionsOfTest(req, res, next) {
    const level = +req.params.level;
    new OKResponse({
      message: "OK",
      metadata: await QuestionService.getQuestionOfTest({ level }),
    }).send(res);
  }
}

module.exports = QuestionController;
