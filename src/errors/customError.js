"use strict";
const { StatusCodes } = require("http-status-codes");
class CustomError extends Error {
  name = "CustomError";
  statusCode;
  constructor(
    message = "Something went wrong",
    status = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.status = status;
  }
}

class NotFoundError extends Error {
  name = "NotFoundError";
  statusCode = StatusCodes.NOT_FOUND;
  constructor(message = "Not found") {
    super(message);
  }
}

class BadRequestError extends Error {
  name = "BadRequestError";
  statusCode = StatusCodes.BAD_REQUEST;
  constructor(message = "Data is invalid") {
    super(message);
  }
}

module.exports = { BadRequestError, NotFoundError, CustomError };
