const talkersModel = require('../models/talkersModel');

const serialize = (talker) => ({
  idTalker: talker.id_talker,
  nameTalker: talker.name_talker,
  ageTalker: talker.age_talker,
  emailTalker: talker.email_talker,
});

const getAllTalkers = async () => {
  const response = await talkersModel.getAllTalkers();

  const newResponse = response.map(serialize);

  return newResponse;
}

module.exports = {
  getAllTalkers,
}
