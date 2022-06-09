const joi = require('joi');
const { BadRequestError, UnprocessableEntityError } = require('restify-errors');

const productCreationSchema = joi.object({
  name: joi.string().not().empty().required(),
  quantity: joi.number().positive().min(1).required(),
});

const createValidation = (req, _res, next) => {
  const { error } = productCreationSchema.validate(req.body);

  if (error) {
    throw error.details[0].message.includes('required')
      ? new BadRequestError(error.details[0].message)
      : new UnprocessableEntityError(error.details[0].message);
  }

  next();
};

module.exports = { createValidation };
