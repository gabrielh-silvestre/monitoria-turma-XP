const talkersService = require('../services/talkersService');

const getAllTalkers = async (_req, res) => {
  const response = await talkersService.getAllTalkers();

  return res.status(200).json(response);
};

const getTalkerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await talkersService.getTalkerById(id);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};


const createTalker = async (req, res) => {
  const { name, age, email } = req.body;
  const response = await talkersService.createTalker({ name, age, email });

  return res.status(201).json(response);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  await talkersService.deleteTalker(id);

  return res.status(200).end();
};

const updateTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;

  const response = await talkersService.updateTalker(id, { name, age, email });

  return res.status(201).json(response);
};

module.exports = {
  getAllTalkers,
  createTalker,
  deleteTalker,
  updateTalker,
  getTalkerById
}
