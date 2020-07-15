const joi = require("@hapi/joi");
const { response } = require("../lib");
exports.paramValidation = async (req, res, next) => {
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
