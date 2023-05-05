const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const { HTTPStatus, ErrorCode } = require("../helpers/enum");
const { Message, Action } = require("../helpers/messages");

const validateUser = async (req, res, next) => {
  const SignUpSchema = Joi.object().keys({
    name: Joi.string()  
      .min(6)
      .required()
      .messages({
       
        'string.empty': 'Display name cannot be empty',
        'string.min': 'Min 6 characters',
      })
      .optional(),
    email: Joi.string().min(6).required().email().message({"any.required":"valid email Required!"}),
    password: Joi.string().required().min(6).message({"any.required":"password Required!"}),
    userName: Joi.string().required(),
    country: Joi.string().required(),
    dateOfBirth:Joi.string().required(),
    bio: Joi.string(),
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
