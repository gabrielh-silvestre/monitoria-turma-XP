const fs = require('fs/promises');

const readTasks = async () => {
  const stringTasks = await fs.readFile('./task.json', 'utf8');
  const tasks = JSON.parse(stringTasks);

  return tasks;
};

const writeTasks = async (tasks) => {
  const stringTasks = JSON.stringify(tasks, null, 2);

  await fs.writeFile('./task.json', stringTasks, 'utf8');
};

const taskSerializer = (task) => {
  return {
    ...task,
    completed: task.completed ? true : false,
  };
};

module.exports = {
  readTasks,
  writeTasks,
  taskSerializer,
};
