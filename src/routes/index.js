const router = require('express').Router();
const rescue = require('express-rescue');
const talkersController = require('../controllers/talkersController');
const validateTalker = require('../middlewares/validateTalker');


router.get('/', talkersController.getAllTalkers);
router.get('/:id', talkersController.getTalkerById);
router.post('/', rescue(validateTalker), rescue(talkersController.createTalker));
router.delete('/:id', talkersController.deleteTalker);
router.put('/:id', talkersController.updateTalker);

module.exports = router;
