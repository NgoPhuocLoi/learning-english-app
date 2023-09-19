const { CreatedResponse, OKResponse } = require("../helpers/success.response");
const AccessService = require("../services/access.service");
class AccessController {
  static async register(req, res, next) {
    new CreatedResponse({
      message: "Register successfully!",
      metadata: await AccessService.register(req.body),
    }).send(res);
  }

  static async login(req, res, next) {
    new OKResponse({
      message: "Login successfully!",
      metadata: await AccessService.login(req.body),
    }).send(res);
  }
}

module.exports = AccessController;
