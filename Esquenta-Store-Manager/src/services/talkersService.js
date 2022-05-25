const talkersModel = require('../models/talkersModel');
const createObjError = require('../utils/createObjError');

const serialize = (talker) => ({
  idTalker: Number(talker.id_talker),
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

  const newResponse = serialize(response[0]);

  return newResponse;
}

const createTalker = async (name, age, email) => {
  const idNewTalker = await talkersModel.createTalker({ name, age, email });

  return {
    idTalker: Number(idNewTalker),
    nameTalker: name,
    ageTalker: age,
    emailTalker: email,
  }
}

const updateTalker = async (id, name, age, email) => {
  await getTalkerById(id);
  await talkersModel.updateTalker({ id, name, age, email });

  return {
    idTalker: Number(idNewTalker),
    nameTalker: name,
    ageTalker: age,
    emailTalker: email,
  }
}

module.exports = {
  getAllTalkers,
  getTalkerById,
  createTalker,
  updateTalker
}
