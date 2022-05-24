const frisby = require('frisby');
const mysql = require('mysql2/promise');
const restoreDb = require('./restoreDb');
require('dotenv').config();

describe('04 - Crie o endpoint DELETE /talkers/:id', () => {
  const url = `http://localhost:${process.env.PORT}`;
  let connection;

  beforeAll(async () => {
    const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;

    connection = mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
    });

    await restoreDb();
  });

  afterAll(async () => {
    await connection.execute("DROP DATABASE EsquentaMonitoria");
    await connection.end();
  });

  describe('para deletar uma pessoa palestrante', () => {
    it('Será validado se retorna um erro caso tente deletar uma pessoa palestrante que não existe', async () => {
      await frisby
        .delete(`${url}/talkers/5`)
        .expect('status', 404)
        .then((response) => {
          let { json } = response;

          expect(json).toHaveProperty('message');
          expect(json.message).toEqual('"talker" not found');
        });
    });

    it('Será validado se é deletado uma pessoa palestrante com sucesso', async () => {
      await frisby
        .delete(`${url}/talkers/1`)
        .expect('status', 200);
        
      await frisby
        .get(`${url}/talkers/1`)
        .then((response) => {
          const { json } = response;
  
          expect(json).toHaveProperty('message');
          expect(json.message).toEqual('"talker" not found');
        });
    });
  });
});