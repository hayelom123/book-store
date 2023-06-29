const mongoose = require("mongoose");
const httpStatus = require("http-status");
const config = require("../config/config");
const logger = require("../config/logger");
const ApiError = require("../utils/ApiError");
const apiResponse = require("../helpers/apiResponse");
const deleteFile = require("../utils/delete.files");
const errorConverter = (err, req, res, next) => {
  if (req.file) {
    deleteFile(req.file["path"]);
  }
  if (req.files) {
    req.files.map((file) => {
      deleteFile(file["path"]);
      return file["filename"];
    });
  }
  console.log("================================");
  console.log(err);
  console.log("================================");

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";
  err.validation = err.validation || {};

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found with this id.. Invalid ${err.path}`;
    return apiResponse.ErrorResponse(res, message);
  }
  if (err.name == "ValidationError") {
    let test = Object.keys(err.errors).map((key) => {
      return {
        kind: err.errors[key]["kind"],
        path: err.errors[key]["path"],
        value: err.errors[key]["value"],
        name: err.errors[key]["name"],
        message: err.errors[key]["message"], //valueType
      };
    });

    test = test.map((ob) => {
      if (ob.name == "CastError") {
        return { [ob.path]: `${ob.value} is not a ${ob.kind}` };
      } else if (ob.name == "ValidatorError") {
        return { [ob.path]: ob.message };
      } else {
      }
    });
    test = test.reduce((obj, item) => ({ ...obj, ...item }), {});

    return apiResponse.validationErrorWithData(
      res,
      // "Invalid Data, please give correct info",
      "Validations failed",
      test
    );
  }
  if (err.code === 11000) {
    // Duplicate key error
    // const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;

    return apiResponse.validationErrorWithData(
      res,
      `${Object.keys(err.keyValue)} already exist`,
      err.keyValue
    );
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    return apiResponse.ErrorResponse(
      res,
      `Your url is invalid please try again letter`
    );
    // const message = `Your url is invalid please try again letter`;
    // err = new ApiError(
    //   err.statusCode,
    //   message,
    //   err.validation,
    //   false,
    //   err.stack
    // );
  }

  // jwt expired
  if (err.name === "TokenExpiredError") {
    return apiResponse.ErrorResponse(res, err.message);
    // const message = `Your session is expired please try again letter!`;
    // err = new ApiError(
    //   err.statusCode,
    //   message,
    //   err.validation,
    //   false,
    //   err.stack
    // );
  }

  return apiResponse.ErrorResponse(res, err.message, err.statusCode);
  // next(err);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message, validation } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    success: false,
    validation,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {
    logger.error(err);
  }

  // res.status(statusCode).send(response);
  return apiResponse.ErrorResponse(res, response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
