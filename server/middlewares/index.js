const joi = require("@hapi/joi");
const { response } = require("../lib");
const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");

exports.registrationParamValidation = async (req, res, next) => {
  console.log("validation");
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
    return Promise.reject(res.json(response(true, "401", errorsArr, null)));
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
    return res.json(response(true, "401", errorsArr, null));
  }
  next();
};
exports.authTokenParamValidation = (req, res, next) => {
  console.log("auth token param validation");
  let authToken = { authToken: req.header("authToken") };
  const schema = joi.object({
    authToken: joi.string().min(15).required(),
  });
  let { error } = schema.validate(authToken);
  if (error)
    return res.json(
      response(true, 401, "AuthToken Error", error.details[0].message)
    );
  next();
};
exports.notfound = (req, res, next) => {
  res.json(response(true, 400, "Path Not Found", req.path));
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
exports.isAuthorized = async (req, res, next) => {
  console.log("is authorized middleware");
  //get header
  if (
    req.header("authToken") !== null ||
    req.header("authToken") !== undefined ||
    req.header("authToken") !== ""
  ) {
    //find the token entry
    let authTokenReqParam = req.header("authToken");
    let authExist = await Auth.findOne({ authToken: authTokenReqParam });
    if (authExist) {
      const { authToken, tokenSecret, email } = authExist;
      console.log("value from db", email);
      //decode and match
      jwt.verify(authToken, tokenSecret, (error, decodedInfo) => {
        if (error !== null) {
          return res
            .staus(401)
            .json(response(true, 401, "Auth Token is not Valid", null));
        } else {
          console.log("decoded");
          return (req.email = decodedInfo.data.email);
        }
      });
    } else {
      return res
        .status(404)
        .json(true, 404, "AuthToken not Valid,login again", null);
    }
  } else {
    return res
      .status(400)
      .json(response(true, 400, "Auth Token is Required", null));
  }
  next();
};
exports.logoutParamValidation = (req, res, next) => {
  console.log("logout validation");
  const schema = joi.object({
    email: joi.string().min(6).email().required(),
  });
  let { error } = schema.validate(req.body);
  if (error) {
    return res.json(response(true, 400, error.details[0].message, null));
  }
  next();
};
