const talkersModel = require('../models/talkersModel');
const createObjError = require('../utils/createObjError');

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

const getTalkerById = async (id) => {
  const response = await talkersModel.getTalkerById({ id });

  if(!response.length) throw createObjError(404, '"talker" not found');

  const newResponse = serialize(response);

  return newResponse;
}

module.exports = {
  getAllTalkers,
  getTalkerById,
}
