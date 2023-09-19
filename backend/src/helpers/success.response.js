const { StatusCode, ReasonPhrases } = require("../utils/httpStatusCode");
class SuccessResponse {
  constructor({
    message = ReasonPhrases.OK,
    statusCode = StatusCode.OK,
    metadata = {},
  }) {
    this.message = message;
    this.metadata = metadata;
    this.statusCode = statusCode;
  }

  send(res, headers = {}) {
    res.status(this.statusCode).json({
      status: "success",
      message: this.message,
      metadata: this.metadata,
    });
  }
}

class OKResponse extends SuccessResponse {
  constructor({ message, metadata, options }) {
    super({ message, metadata });
    this.options = options;
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({
    message = ReasonPhrases.CREATED,
    metadata,
    statusCode = StatusCode.CREATED,
    options,
  }) {
    super({ message, metadata, statusCode });
    this.options = options;
  }
}

module.exports = {
  OKResponse,
  CreatedResponse,
};
