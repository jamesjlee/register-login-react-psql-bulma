const validation = require("../form_validation/validation");
const Joi = require("joi");

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      user_first_name: Joi.string()
        .regex(validation.regex.nameRe)
        .required(),
      user_last_name: Joi.string()
        .regex(validation.regex.nameRe)
        .required(),
      user_phone_number: Joi.string()
        .regex(validation.regex.phoneRe)
        .required(),
      user_email: Joi.string()
        .email()
        .regex(validation.regex.emailRe)
        .required(),
      user_password: Joi.string()
        .regex(validation.regex.passwordRe)
        .required(),
      user_confirm_password: Joi.any()
        .valid(Joi.ref("user_password"))
        .required()
    }),
    loginSchema: Joi.object().keys({
      user_email: Joi.string()
        .email()
        .regex(validation.regex.emailRe)

        .required(),
      user_password: Joi.string()
        .regex(validation.regex.passwordRe)
        .required()
    })
  }
};
