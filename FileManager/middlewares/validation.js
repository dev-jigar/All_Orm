const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const { HTTPStatus, ErrorCode } = require("../helpers/enum");
const { Message, Action } = require("../helpers/messages");

const validateUser = async (req, res, next) => {
  const SignUpSchema = Joi.object().keys({
    FirstName: Joi.string().required().messages({
      "string.empty": "Display FirstName cannot be empty",
    }),
    LastName: Joi.string().required().messages({
      "string.empty": "Display LastName cannot be empty",
    }),

    email: Joi.string()
      .min(6)
      .required()
      .email()
      .messages({ "any.required": "valid email Required!" }),
    password: Joi.string()
      .required()
      .min(6)
      .messages({ "any.required": "password Required!" }),
    confirm_password: Joi.any().valid(Joi.ref('password')).required().label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
    UserName: Joi.string().min(6).required().messages({
      "string.empty": "Display LastName cannot be empty",
      "string.min": "User Name must be atleast 6 characters",
    }),
    contact: Joi.number().integer().min(10).required().messages({
      "number.empty": "Display contact cannot be empty",
      "number.min": "User Name must be atleast 10 digits",
    }),
  });

  const { error } = SignUpSchema.validate(req.body);
  if (error) {
    const { details } = error;
    res.status(HTTPStatus.PAGE_NOT_FOUND_CODE).json({ error: details });
  } else {
    next();
  }
};

module.exports = { validateUser };
