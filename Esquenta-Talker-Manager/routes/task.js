const express = require('express');
const rescue = require('express-rescue');

const { readTasks, writeTasks } = require('../helpers');
const { validateAuth } = require('../middlewares/validateAuth');
const { validateNewTask } = require('../middlewares/validateData');

const taskRoute = express.Router();

taskRoute.use(express.json());

taskRoute.get(
  '/',
  rescue(async (_req, res) => {
    const tasks = await readTasks();

    res.status(200).json(tasks);
  })
);

taskRoute.use(validateAuth);

taskRoute.post(
  '/',
  rescue(validateNewTask),
  rescue(async (req, res) => {
    const { title, description, completed } = req.body;

    const tasks = await readTasks();

    const newTask = {
      id: Math.max(...tasks.map((task) => task.id)) + 1,
      title,
      description,
      completed,
    };

    tasks.push(newTask);

    await writeTasks(tasks);

    res.status(201).json(newTask);
  })
);

taskRoute.put(
  '/:id',
  rescue(validateNewTask),
  rescue(async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const tasks = await readTasks();

    const foundTask = tasks.find((task) => task.id === Number(id));

    if (!foundTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const attTask = {
      ...foundTask,
      title,
      description,
      completed,
    };

    tasks.splice(tasks.indexOf(foundTask), 1, attTask);

    await writeTasks(tasks);

    return res.status(200).json(attTask);
  })
);

taskRoute.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const tasks = await readTasks();

    const foundTask = tasks.find((task) => task.id === Number(id));

    if (!foundTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(tasks.indexOf(foundTask), 1);

    await writeTasks(tasks);

    return res.status(204).send();
  })
);

module.exports = {
  taskRoute,
};
