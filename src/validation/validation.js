const Joi = require('joi');
// Validation :
// const Joi = require('@hapi/joi');

// Register Validation :
const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(8).required(),
    confirm_password: Joi.any()
															.valid(Joi.ref('password'))
                              .label('Confirm password')
                              .messages({ 'any.only': '{{#label}} does not match' })
                            	.required()
  });
  return schema.validate(data);
};

// Login Validation :
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(8).required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
