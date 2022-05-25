const route = require('express').Router();
const rescue = require('express-rescue');
const talkersController = require('../controllers/talkersController');

route.get('/', rescue(talkersController));

module.exports = route;
