const talkersModel = require('../models/talkersModel');

const getAllTalkers = async () => {
  const response = await talkersModel.getAllTalkers();

  return response;
}

module.exports = {
  getAllTalkers,
}
