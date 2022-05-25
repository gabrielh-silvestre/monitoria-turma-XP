const connection = require('./connection');

const getAllTalkers = async () => {
  const query = `
    SELECT * FROM talkers
  `;

  const [response] = await connection.execute(query);

  return response;
};

const getAllTalkerById = async ({ id }) => {
  const query = `
    SELECT * FROM talkers WHERE id_talker = ?
  `;

  const [response] = await connection.execute(query, [id]);

  return response;
};

module.exports = {
  getAllTalkers,
  getAllTalkerById
}
