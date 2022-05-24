const frisby = require('frisby');
const mysql = require('mysql2/promise');
const restoreDb = require('./restoreDb');
require('dotenv').config();

describe('Crie o endpoint POST /talkers', () => {
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

  const name = 'Joao da Matta';
  const age = 22;
  const email = 'joao.matta2020@gmail.com';

  describe('para cadastrar uma pessoa palestrante', () => {
    it('Será validado se retorna um erro caso mande uma pessoa palestrante sem nome', async () => {
      await frisby
        .post(`${url}/talkers`, {
          age,
          email
        })
        .expect('status', 400)
        .then((response) => {
          let { json } = response;
        
          expect(json).toHaveProperty('message');
          expect(json.message).toEqual('"name" is required');
        });
    });

    it('Será validado se retorna um erro caso mande uma pessoa palestrante com o nome menor que quatro caracteres', async () => {
      await frisby
        .post(`${url}/talkers`, {
          name: 'Ruy',
          age,
          email
        })
        .expect('status', 400)
        .then((response) => {
          let { json } = response;
        
          expect(json).toHaveProperty('message');
          expect(json.message).toEqual('"name" length must be at least 4 characters long');
        });
    });

    it('Será validado se retorna um erro caso mande uma pessoa palestrante sem a idade', async () => {
      await frisby
        .post(`${url}/talkers`, {
          name,
          email
        })
        .expect('status', 400)
        .then((response) => {
          let { json } = response;
        
          expect(json).toHaveProperty('message');
          expect(json.message).toEqual('"age" is required');
        });
    });

    it('Será validado se retorna um erro caso mande uma pessoa palestrante com idade menor a 18 anos', async () => {
      await frisby
        .post(`${url}/talkers`, {
          name,
          age: 12,
          email
        })
        .expect('status', 400)
        .then((response) => {
          let { json } = response;
        
          expect(json).toHaveProperty('message');
          expect(json.message).toEqual('"age" must be greater than or equal to 18');
        });
    });

    it('Será validado se retorna um erro caso mande uma pessoa sem o email', async () => {
      await frisby
        .post(`${url}/talkers`, {
          name,
          age
        })
        .expect('status', 400)
        .then((response) => {
          let { json } = response;
        
          expect(json).toHaveProperty('message');
          expect(json.message).toEqual('"email" is required');
        });
    });

    it('Será validado se retorna um erro caso mande uma pessoa sem com o formato de email inválido', async () => {
      await frisby
        .post(`${url}/talkers`, {
          name,
          age,
          email: 'teste'
        })
        .expect('status', 400)
        .then((response) => {
          let { json } = response;
        
          expect(json).toHaveProperty('message');
          expect(json.message).toEqual('"email" must be a valid email');
        });
    });

    it('Será validado se é possivel cadastrar uma nova pessoa com sucesso', async () => {
      await frisby
        .post(`${url}/talkers`, {
          name,
          age,
          email
        })
        .expect('status', 201)
        .then((response) => {
          let { json } = response;

          console.log(json);

          expect(json).toHaveProperty('idTalker');
          expect(json).toHaveProperty('nameTalker');
          expect(json).toHaveProperty('ageTalker');
          expect(json).toHaveProperty('emailTalker');
          expect(json.idTalker).toEqual(5);
          expect(json.nameTalker).toEqual(name);
          expect(json.ageTalker).toEqual(age);
          expect(json.emailTalker).toEqual(email);
        });

      await frisby
        .get(`${url}/talkers`,)
        .expect('status', 200)
        .then((response) => {
          let { json } = response;

          expect(json[4]).toHaveProperty('idTalker');
          expect(json[4]).toHaveProperty('nameTalker');
          expect(json[4]).toHaveProperty('ageTalker');
          expect(json[4]).toHaveProperty('emailTalker');
          expect(json[4].idTalker).toEqual(5);
          expect(json[4].nameTalker).toEqual(name);
          expect(json[4].ageTalker).toEqual(age);
          expect(json[4].emailTalker).toEqual(email);
        });
    });
  });
});