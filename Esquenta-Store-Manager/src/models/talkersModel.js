const connection = require('./connection');

const getAllTalkers = async () => {
  const query = `
    SELECT * FROM EsquentaMonitoria.talkers
  `;

  const [response] = await connection.execute(query);

  return response;
};

const getTalkerById = async (id) => {
  const query = `
    SELECT * FROM EsquentaMonitoria.talkers
    WHERE id_talker = ?
  `;

  const [response] = await connection.execute(query, [id]);

  return response;
};

const createTalker = async ({ name, age, email }) => {
  const query = `
    INSERT INTO EsquentaMonitoria.talkers (name_talker, age_talker, email_talker)
    VALUES (?, ?, ?);
  `;

  const [response] = await connection.execute(query, [name, age, email]);

  return response;
}

const deleteTalker = async (id) => {
  const query = `
    DELETE FROM EsquentaMonitoria.talkers
    WHERE id_talker = ?
  `;

  await connection.execute(query, [id]);
}

const updateTalker = async (id, { name, age, email }) => {
  const query = `
    UPDATE EsquentaMonitoria.talkers
    SET name_talker = ?, age_talker = ?, email_talker = ?
    WHERE id_talker = ?
  `;

  await connection.execute(query, [name, age, email, id]);
}

module.exports = {
  getAllTalkers,
  createTalker,
  deleteTalker,
  updateTalker,
  getTalkerById,
}
