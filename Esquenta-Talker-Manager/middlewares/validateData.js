const joi = require('joi');

const validateNewTask = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().min(3).required(),
    description: joi.string().required(),
    completed: joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  validateNewTask,
};
