const { connection } = require('./connection');

const findAll = async () => {
  const query = `SELECT * FROM Tasks`;

  const [result] = await connection.execute(query);
  return result;
};

const findByTitle = async ({ title }) => {
  const query = `SELECT * FROM Tasks WHERE title = ?`;

  const [result] = await connection.execute(query, [title]);
  return result.length === 0 ? null : result[0];
};

const findById = async ({ id }) => {
  const query = `SELECT * FROM Tasks WHERE id = ?`;

  const [result] = await connection.execute(query, [id]);
  return result.length === 0 ? null : result[0];
};

const create = async ({ title, description, completed }) => {
  const query = `INSERT INTO Tasks (title, description, completed) VALUES (?, ?, ?)`;

  const [{ insertId }] = await connection.execute(query, [
    title,
    description,
    completed,
  ]);

  return {
    id: insertId,
    title,
    description,
    completed,
  };
};

const update = async ({ id, title, description, completed }) => {
  const query = `UPDATE Tasks SET title = ?, description = ?, completed = ? WHERE id = ?`;

  await connection.execute(query, [title, description, completed, id]);

  return {
    id,
    title,
    description,
    completed,
  };
};

const destroy = async ({ id }) => {
  const query = `DELETE FROM Tasks WHERE id = ?`;

  await connection.execute(query, [id]);
};

module.exports = {
  TaskModel: {
    findAll,
    findByTitle,
    findById,
    create,
    update,
    destroy,
  },
};
