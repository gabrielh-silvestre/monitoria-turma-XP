const frisby = require('frisby');
const mysql = require('mysql2/promise');
const restoreDb = require('./restoreDb');
require('dotenv').config();

describe('01 - Crie o endpoint GET /talkers', () => {
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

  describe('para listar todas as pessoas palestrantes', () => {
    it('Será validado que todas as pessoas palestrantes estão sendo retornadas', async () => {
      await frisby
        .get(`${url}/talkers`)
        .expect('status', 200)
        .then((response) => {
          let { json } = response;

          expect(json[0]).toHaveProperty('idTalker');
          expect(json[0]).toHaveProperty('nameTalker');
          expect(json[0]).toHaveProperty('ageTalker');
          expect(json[0]).toHaveProperty('emailTalker');
          expect(json[0].nameTalker).toEqual('Henrique Albuquerque');
          expect(json[0].ageTalker).toEqual(62);
          expect(json[0].emailTalker).toEqual('henrique.albuquerque10@gmail.com');

          expect(json[1]).toHaveProperty('idTalker');
          expect(json[1]).toHaveProperty('nameTalker');
          expect(json[1]).toHaveProperty('ageTalker');
          expect(json[1]).toHaveProperty('emailTalker');
          expect(json[1].nameTalker).toEqual('Heloísa Albuquerque');
          expect(json[1].ageTalker).toEqual(67);
          expect(json[1].emailTalker).toEqual('heloisa.albuquerque10@gmail.com');

          expect(json[2]).toHaveProperty('idTalker');
          expect(json[2]).toHaveProperty('nameTalker');
          expect(json[2]).toHaveProperty('ageTalker');
          expect(json[2]).toHaveProperty('emailTalker');
          expect(json[2].nameTalker).toEqual('Ricardo Xavier Filho');
          expect(json[2].ageTalker).toEqual(33);
          expect(json[2].emailTalker).toEqual('ricardo.xavier10@gmail.com');

          expect(json[3]).toHaveProperty('idTalker');
          expect(json[3]).toHaveProperty('nameTalker');
          expect(json[3]).toHaveProperty('ageTalker');
          expect(json[3]).toHaveProperty('emailTalker');
          expect(json[3].nameTalker).toEqual('Marcos Costa');
          expect(json[3].ageTalker).toEqual(24);
          expect(json[3].emailTalker).toEqual('marcos.costa2022@gmail.com');
        });
    });
  });
});