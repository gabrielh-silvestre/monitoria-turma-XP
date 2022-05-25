const route = require('express').Router();
const rescue = require('express-rescue');
const talkersController = require('../controllers/talkersController');

route.get('/', rescue(talkersController.getAllTalkers));
route.get('/:id', rescue(talkersController.getTalkerById));

module.exports = route;
