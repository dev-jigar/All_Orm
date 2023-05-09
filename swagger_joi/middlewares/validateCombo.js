const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const { HTTPStatus, ErrorCode } = require("../helpers/enum");
const { Message, Action } = require("../helpers/messages");

const validateCombo = async (req, res, next) => {
  const select_option_Schema = Joi.object().keys({
    name: Joi.string().required().messages({
      "string.empty": "Display name cannot be empty",
    }),
    controller: Joi.string()
      .valid("checkbox", "radio", "dropdown")
      .required()
      .messages({ "any.required": "Enter valid  choice!" }),
    option_master: Joi.array()
      .items(
        Joi.object({
          op_name: Joi.string().required(),
        })
      )
      .min(1)
      .required()
      .messages({
        "string.required": "Display options cannot be empty",
      }),
  });
  const { error } = select_option_Schema.validate(req.body);
  if (error) {
    const { details } = error;
    res.status(HTTPStatus.PAGE_NOT_FOUND_CODE).json({ error: details });
  } else {
    next();
  }
};
const validateuptCombo = async (req, res, next) => {
  const select_option_Schema = Joi.object().keys({
    select_id: Joi.number().required().messages({"integer.required": "Selected option must be a number"}),
    name: Joi.string().required().messages({
      "string.empty": "Display name cannot be empty",
    }),
    controller: Joi.string()
      .valid("checkbox", "radio", "dropdown")
      .required()
      .messages({ "any.required": "Enter valid  choice!" }),
    option_master: Joi.array()
      .items(
        Joi.object({
          op_name: Joi.string().required(),
        })
      )
      .min(1)
      .required()
      .messages({
        "string.required": "Display options cannot be empty",
      }),
  });
  const { error } = select_option_Schema.validate(req.body);
  if (error) {
    const { details } = error;
    res.status(HTTPStatus.PAGE_NOT_FOUND_CODE).json({ error: details });
  } else {
    next();
  }
};

module.exports = { validateCombo,validateuptCombo };
