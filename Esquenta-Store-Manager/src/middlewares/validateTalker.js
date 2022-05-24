const schemaTalker = require('../joi/schemaTalker');
const shemaTalker = require('../joi/schemaTalker');
const createObjError = require('../utils/createObjError');

module.exports = (req, _res, next) => {
  const { name, age, email } = req.body;

  const { error } = schemaTalker.validate({ name, age, email });

  if (error) throw createObjError(400, error.message);

  next();
};
