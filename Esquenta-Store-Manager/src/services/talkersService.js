const { response } = require('express');
const talkersModel = require('../models/talkersModel');

const capitalize = (talker) => ({
  idTalker: talker.id_talker,
  nameTalker: talker.name_talker,
  ageTalker: talker.age_talker,
  emailTalker: talker.email_talker
});

const seriealizeNewTalker = (id, talker) => ({
  idTalker: id,
  nameTalker: talker.name,
  ageTalker: talker.age,
  emailTalker: talker.email
});

const getAllTalkers = async () => {
  const response = await talkersModel.getAllTalkers();

  const newResponse = response.map(capitalize);

  return newResponse;
};

const getTalkerById = async (id) => {
  const response = await talkersModel.getTalkerById(id);
  
  if (!response.length) throw { status: 404, message: '"talker" not found' }

  const newResponse = capitalize(response[0]);

  return newResponse;
};

const createTalker = async (talker) => {
  const response = await talkersModel.createTalker(talker);

  const newTalker = seriealizeNewTalker(response.insertId, talker);

  return newTalker;
}

const deleteTalker = async (id) => {
  await talkersModel.deleteTalker(id);
}

const updateTalker = async (id, talker) => {
  await talkersModel.updateTalker(id, talker);

  const newTalker = seriealizeNewTalker(id, talker);

  return newTalker;
}

module.exports = {
  getAllTalkers,
  createTalker,
  deleteTalker,
  updateTalker,
  getTalkerById,
}

