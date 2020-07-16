const joi = require("@hapi/joi");
const { response } = require("../lib");
const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");

exports.registrationParamValidation = async (req, res, next) => {
  //create joi schema with validation params
  let schema = joi.object({
    firstName: joi.string().min(5).required(),
    lastName: joi.string().min(5).required(),
    email: joi.string().min(6).email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[A-Za-z0-9]\\w{7,}$"))
      .required(),
  });
  //set false flag to get all the required validation errors
  let options = { abortEarly: false };
  let { error } = schema.validate(req.body, options);

  //compute the generated error array if any
  if (error) {
    let errorsArr = [];
    error.details.map((err) => errorsArr.push(err.message));
    return res.status(403).json(response(true, "401", errorsArr, null));
  }

  next();
};
exports.loginParamValidation = (req, res, next) => {
  //create schema for login validation
  let loginSchema = joi.object({
    email: joi.string().email().min(6).required(),
    password: joi
      .string()
      .pattern(new RegExp("^[A-Za-z0-9]\\w{7,}$"))
      .required(),
  });
  //set false flag to get all the required validation errors
  let options = { abortEarly: false };
  let { error } = loginSchema.validate(req.body, options);

  if (error) {
    let errorsArr = [];
    error.details.map((err) => errorsArr.push(err.message));
    return res.status(403).json(response(true, "401", errorsArr, null));
  }
  next();
};
exports.authTokenParamValidation = (req, res, next) => {
  console.log("auth token param validation", req.header("authToken"));
  let authToken = req.header("authToken");
  let validate = {
    authToken: authToken,
  };
  const schema = joi.object({
    authToken: joi.string().min(15).required(),
  });
  let { error } = schema.validate(validate);
  if (error)
    return res
      .status(401)
      .json(response(true, 401, "AuthToken Error", error.details[0].message));
  next();
};
exports.notfound = (req, res, next) => {
  res.status(400).json(response(true, 400, "Path Not Found", req.path));
  next();
};
exports.logIp = (req, res, next) => {
  const ip = req.ip;
  const path = req.originalUrl;
  let protocol = req.protocol;
  let method = req.method;
  console.log(
    `${method} requested by -${ip} for path -${path} using ${protocol}`
  );
  next();
};
exports.isAuthorized = (req, res, next) => {
  console.log("is authorized middleware");
  next();
};
