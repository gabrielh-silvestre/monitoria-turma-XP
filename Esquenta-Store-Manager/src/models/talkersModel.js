const connection = require('./connection');

const getAllTalkers = async () => {
  const query = `
    SELECT * FROM talkers
  `;

  const [response] = await connection.execute(query);

  return response;
};

const getTalkerById = async ({ id }) => {
  const query = `
    SELECT * FROM talkers WHERE id_talker = ?
  `;

  const [response] = await connection.execute(query, [id]);

  return response;
};

const createTalker = async ({ name, age, email }) => {
  const query = `
    INSERT INTO talkers (name_talker, age_talker, email_talker)
    VALUES (?, ?, ?)
  `;

  const [{ insertId }] = await connection.execute(query, [name, age, email]);

  return insertId;
};

const updateTalker = async ({ id, name, age, email }) => {
  const query = `
    UPDATE talkers 
    SET name_talker = ?, age_talker = ? , email_talker = ?
    WHERE id_talker = ?
  `;

  await connection.execute(query, [name, age, email, id]);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  createTalker,
  updateTalker,
}
