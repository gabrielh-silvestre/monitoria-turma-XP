const joi = require('joi');
const { BadRequestError, UnprocessableEntityError } = require('restify-errors');

const saleCreationSchema = joi.object({
  productId: joi.number().required(),
  quantity: joi.number().positive().min(1).required(),
});

const createValidation = (req, _res, next) => {
  if (req.body.length === 0) {
    throw new BadRequestError('"products" is required');
  }

  const errors = req.body.reduce((acc, product) => {
    const { error } = saleCreationSchema.validate(product);

    if (error) {
      return [...acc, error];
    }

    return acc;
  }, []);

  if (errors.length > 0) {
    throw errors[0].details[0].message.includes('required')
      ? new BadRequestError(errors[0].details[0].message)
      : new UnprocessableEntityError(errors[0].details[0].message);
  }

  next();
};

module.exports = { createValidation };
