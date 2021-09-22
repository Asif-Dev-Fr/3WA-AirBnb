const Joi = require('joi');
// Validation :
// const Joi = require('@hapi/joi');

// Register Validation :
const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).required(),
    password_confirmation: Joi.any()
															.valid(Joi.ref('password'))
                            	.required()
															.options({ language: { any: { allowOnly: 'must match password' } } })
  });
  return schema.validate(data);
};

// Login Validation :
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
