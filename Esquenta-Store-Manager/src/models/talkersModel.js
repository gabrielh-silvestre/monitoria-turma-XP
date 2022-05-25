const connection = require('./connection');

const getAllTalkers = async () => {
  const query = `
    SELECT * FROM talkers
  `;

  const [response] = await connection.execute(query);

  return response;
};

module.exports = {
  getAllTalkers,
}
