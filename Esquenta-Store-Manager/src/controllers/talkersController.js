const talkersService = require('../services/talkersService');

const getAllTalkers = async (req, res) => {
  const response = await talkersService.getAllTalkers();

  return res.status(200).json(response);
}

module.exports = {
  getAllTalkers
};
