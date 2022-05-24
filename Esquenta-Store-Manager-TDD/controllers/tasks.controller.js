const { TaskServices } = require('../services/tasks.service');

const findAll = async (_req, res) => {
  const { statusCode, data } = await TaskServices.findAll();

  return res.status(statusCode).json(data);
};

const create = async (req, res, next) => {
  const { statusCode, message, data } = await TaskServices.create(req.body);

  if (message) {
    next({
      statusCode,
      message,
    });
  }

  return res.status(statusCode).json(data);
};

const update = async (req, res, next) => {
  const task = {
    ...req.params,
    ...req.body,
  };

  const { statusCode, message, data } = await TaskServices.update(task);

  if (message) {
    next({
      statusCode,
      message,
    });
  }

  return res.status(statusCode).json(data);
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  const { statusCode, message } = await TaskServices.destroy({ id });

  if (message) {
    return next({
      statusCode,
      message,
    });
  }

  return res.status(statusCode).json();
};

module.exports = {
  TaskController: {
    findAll,
    create,
    update,
    destroy,
  },
};
