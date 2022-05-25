const route = require('express').Router();
const rescue = require('express-rescue');
const talkersController = require('../controllers/talkersController');
const validateTalker = require('../middlewares/validateTalker');

route.get('/', rescue(talkersController.getAllTalkers));
route.get('/:id', rescue(talkersController.getTalkerById));
route.post('/', rescue(validateTalker), rescue(talkersController.createTalker));
route.put('/:id', rescue(validateTalker), rescue(talkersController.updateTalker));
route.delete('/:id', rescue(talkersController.deleteTalker));

module.exports = route;
