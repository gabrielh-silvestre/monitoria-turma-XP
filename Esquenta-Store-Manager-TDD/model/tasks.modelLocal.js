const { readTasks, writeTasks } = require('../helpers');

const findAll = async () => {
  const tasks = await readTasks();
  return tasks;
};

const create = async ({ title, description, completed }) => {
  const tasks = await readTasks();

  const newTask = {
    id: Math.max(...tasks.map((task) => task.id)) + 1,
    title,
    description,
    completed,
  };

  tasks.push(newTask);

  await writeTasks(tasks);

  return newTask;
};

const update = async ({ id, title, description, completed }) => {
  const tasks = await readTasks();

  const attTask = {
    id,
    title,
    description,
    completed,
  };

  const attAllTasks = tasks.map((t) => (t.id === id ? attTask : t));

  await writeTasks(attAllTasks);

  return attTask;
};

const destroy = async ({ id }) => {
  const tasks = await readTasks();

  await writeTasks(tasks.filter((t) => t.id !== id));
};

module.exports = {
  TaskModel: {
    findAll,
    create,
    update,
    destroy,
  },
};
