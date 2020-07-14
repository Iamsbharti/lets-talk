const joi = require("@hapi/joi");

exports.registrationParamValidation = (data) => {
  let schema = joi.object({
    firstName: joi.string().min(5).required(),
    lastName: joi.string().min(5).required(),
    email: joi.string().min(6).email().required(),
    password: joi.string().min(8).required(),
  });
  return schema.validate(data);
};
