const { OKResponse } = require("../helpers/success.response");
const UserService = require("../services/user.service");

class UserController {
  static async getCurrentUser(req, res, next) {
    new OKResponse({
      message: "OK",
      metadata: await UserService.getUserById(req.user.id),
    }).send(res);
  }

  static async updateProgress(req, res, next) {
    const userId = req.user.id;
    const { topicId, completed } = req.body;
    new OKResponse({
      message: "OK",
      metadata: await UserService.updateProgress({
        userId,
        topicId,
        completed,
      }),
    }).send(res);
  }

  static async updateLevel(req, res, next) {
    const userId = req.user.id;
    const { currentLevel } = req.body;
    new OKResponse({
      message: "OK",
      metadata: await UserService.updateLevel({
        userId,
        currentLevel,
      }),
    }).send(res);
  }
}

module.exports = UserController;
