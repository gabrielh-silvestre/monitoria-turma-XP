const frisby = require('frisby');
const mysql = require('mysql2/promise');
const restoreDb = require('./restoreDb');
require('dotenv').config();

describe('Crie o endpoint /talkers/:id', () => {
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

  describe('para mostrar uma pessoa palestrante', () => {
    it('Será validado que uma pessoa palestrante está sendo retornada', async () => {
      await frisby
        .get(`${url}/talkers/1`)
        .expect('status', 200)
        .then((response) => {
          let { json } = response;

          console.log(json);

          expect(json).toHaveProperty('idTalker');
          expect(json).toHaveProperty('nameTalker');
          expect(json).toHaveProperty('ageTalker');
          expect(json).toHaveProperty('emailTalker');
          expect(json.idTalker).toEqual(1);
          expect(json.nameTalker).toEqual('Henrique Albuquerque');
          expect(json.ageTalker).toEqual(62);
          expect(json.emailTalker).toEqual('henrique.albuquerque10@gmail.com');
        });

      await frisby
        .get(`${url}/talkers/2`)
        .expect('status', 200)
        .then((response) => {
          let { json } = response;

          console.log(json);

          expect(json).toHaveProperty('idTalker');
          expect(json).toHaveProperty('nameTalker');
          expect(json).toHaveProperty('ageTalker');
          expect(json).toHaveProperty('emailTalker');
          expect(json.idTalker).toEqual(2);
          expect(json.nameTalker).toEqual('Heloísa Albuquerque');
          expect(json.ageTalker).toEqual(67);
          expect(json.emailTalker).toEqual('heloisa.albuquerque10@gmail.com');
        });
    });

    it('Será validado se retorna uma mensagem de erro caso a pessoa palestrante não exista', async () => {
      await frisby
        .get(`${url}/talkers/5`)
        .expect('status', 404)
        .then((response) => {
          let { json } = response;

          console.log(json);

          expect(json).toHaveProperty('message');
          expect(json.message).toEqual('"talker" not found');
        });
    });
  });
});
