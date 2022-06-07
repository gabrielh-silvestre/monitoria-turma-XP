const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().min(4).required(),
  age: Joi.number().min(18).required(),
  email: Joi.string().email().required(),
});
