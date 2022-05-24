const frisby = require('frisby');
const mysql = require('mysql2/promise');
const restoreDb = require('./restoreDb');
require('dotenv').config();

describe('04 - Crie o endpoint PUT /talkers/:id', () => {
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

  describe('para editar uma pessoa palestrante', () => {
    it('Será validado se retorna um erro caso mande uma pessoa palestrante sem nome', async () => {
      await frisby
        .put(`${url}/talkers/1`, {
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
        .put(`${url}/talkers/1`, {
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
        .put(`${url}/talkers/1`, {
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
        .put(`${url}/talkers/1`, {
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
        .put(`${url}/talkers/1`, {
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
        .put(`${url}/talkers/1`, {
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

    it('Será validado se retorna um erro caso mande o id de uma pessoa palestrante que não existe', async () => {
      await frisby
        .put(`${url}/talkers/5`, {
          name,
          age,
          email
        })
        .expect('status', 404)
        .then((response) => {
          let { json } = response;
        
          expect(json).toHaveProperty('message');
          expect(json.message).toEqual('"talker" not found');
        });
    });

    it('Será validado se é possivel editar uma pessoa palestrante com sucesso', async () => {
      await frisby
        .put(`${url}/talkers/1`, {
          name,
          age,
          email
        })
        .expect('status', 200)
        .then((response) => {
          let { json } = response;

          expect(json).toHaveProperty('idTalker');
          expect(json).toHaveProperty('nameTalker');
          expect(json).toHaveProperty('ageTalker');
          expect(json).toHaveProperty('emailTalker');
          expect(json.idTalker).toEqual(1);
          expect(json.nameTalker).toEqual(name);
          expect(json.ageTalker).toEqual(age);
          expect(json.emailTalker).toEqual(email);
        });

      await frisby
        .get(`${url}/talkers`,)
        .expect('status', 200)
        .then((response) => {
          let { json } = response;

          expect(json[0]).toHaveProperty('idTalker');
          expect(json[0]).toHaveProperty('nameTalker');
          expect(json[0]).toHaveProperty('ageTalker');
          expect(json[0]).toHaveProperty('emailTalker');
          expect(json[0].idTalker).toEqual(1);
          expect(json[0].nameTalker).toEqual(name);
          expect(json[0].ageTalker).toEqual(age);
          expect(json[0].emailTalker).toEqual(email);
        });

      const newTalker = 'Roberto Paes';
      const newAge = 52;
      const newEmail = 'roberto.paes2022@gmail.com';

      await frisby
        .put(`${url}/talkers/2`, {
          name: newTalker,
          age: newAge,
          email: newEmail
        })
        .expect('status', 200)
        .then((response) => {
          let { json } = response;

          expect(json).toHaveProperty('idTalker');
          expect(json).toHaveProperty('nameTalker');
          expect(json).toHaveProperty('ageTalker');
          expect(json).toHaveProperty('emailTalker');
          expect(json.idTalker).toEqual(2);
          expect(json.nameTalker).toEqual(newTalker);
          expect(json.ageTalker).toEqual(newAge);
          expect(json.emailTalker).toEqual(newEmail);
        });

      await frisby
        .get(`${url}/talkers`,)
        .expect('status', 200)
        .then((response) => {
          let { json } = response;

          expect(json[1]).toHaveProperty('idTalker');
          expect(json[1]).toHaveProperty('nameTalker');
          expect(json[1]).toHaveProperty('ageTalker');
          expect(json[1]).toHaveProperty('emailTalker');
          expect(json[1].idTalker).toEqual(2);
          expect(json[1].nameTalker).toEqual(newTalker);
          expect(json[1].ageTalker).toEqual(newAge);
          expect(json[1].emailTalker).toEqual(newEmail);
        });
    });
  });
});
