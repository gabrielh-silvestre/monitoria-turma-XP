const { TaskModel } = require('../model/tasks.model');

const findAll = async () => {
  const tasks = await TaskModel.findAll();

  return tasks;
};

const create = async ({ title, description, completed }) => {
  const taskAlreadyExists = await TaskModel.findByTitle({ title });

  if (taskAlreadyExists) {
    return {
      statusCode: 409,
      message: 'Task already exists',
    };
  }

  const newTask = await TaskModel.create({ title, description, completed });

  return {
    statusCode: 201,
    data: newTask,
  };
};

const update = async ({ id, title, description, completed }) => {
  const taskExists = await TaskModel.findById({ id });

  if (!taskExists) {
    return {
      statusCode: 404,
      message: 'Task not found',
    };
  }

  const attTask = await TaskModel.update({
    id: Number(id),
    title,
    description,
    completed,
  });

  return {
    statusCode: 200,
    data: attTask,
  };
};

const destroy = async ({ id }) => {
  const taskExists = await TaskModel.findById({ id });

  if (!taskExists) {
    return {
      statusCode: 404,
      message: 'Task not found',
    };
  }

  await TaskModel.destroy({ id });

  return {
    statusCode: 204,
    data: null,
  };
};

module.exports = {
  TaskServices: {
    findAll,
    create,
    update,
    destroy,
  },
};
