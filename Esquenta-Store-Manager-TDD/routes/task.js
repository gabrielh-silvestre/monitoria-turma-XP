const express = require('express');
const rescue = require('express-rescue');
const { TaskController } = require('../controllers/tasks.controller');

const { validateAuth } = require('../middlewares/validateAuth');
const { validateNewTask } = require('../middlewares/validateData');

const taskRoute = express.Router();

taskRoute.use(express.json());

taskRoute.get('/', rescue(TaskController.findAll));

taskRoute.use(validateAuth);

taskRoute.post('/', rescue(validateNewTask), rescue(TaskController.create));
taskRoute.put('/:id', rescue(validateNewTask), rescue(TaskController.update));
taskRoute.delete('/:id', rescue(TaskController.destroy));

module.exports = {
  taskRoute,
};
