const { connection } = require('./connection');
const { taskSerializer } = require('../helpers');

const findAll = async () => {
  const query = `SELECT * FROM Tasks_Manager.Tasks`;

  const [result] = await connection.execute(query);
  return result.map(taskSerializer);
};

const findByTitle = async ({ title }) => {
  const query = `SELECT * FROM Tasks_Manager.Tasks WHERE title = ?`;

  const [result] = await connection.execute(query, [title]);
  return result.length === 0 ? null : taskSerializer(result[0]);
};

const findById = async ({ id }) => {
  const query = `SELECT * FROM Tasks_Manager.Tasks WHERE id = ?`;

  const [result] = await connection.execute(query, [id]);
  return result.length === 0 ? null : taskSerializer(result[0]);
};

const create = async ({ title, description, completed }) => {
  const query = `INSERT INTO Tasks_Manager.Tasks (title, description, completed) VALUES (?, ?, ?)`;

  const [{ insertId }] = await connection.execute(query, [
    title,
    description,
    completed,
  ]);

  return taskSerializer({
    id: insertId,
    title,
    description,
    completed,
  });
};

const update = async ({ id, title, description, completed }) => {
  const query = `UPDATE Tasks_Manager.Tasks SET title = ?, description = ?, completed = ? WHERE id = ?`;

  await connection.execute(query, [title, description, completed, id]);

  return taskSerializer({
    id,
    title,
    description,
    completed,
  });
};

const destroy = async ({ id }) => {
  const query = `DELETE FROM Tasks_Manager.Tasks WHERE id = ?`;

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
