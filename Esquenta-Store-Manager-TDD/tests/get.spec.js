require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const mysql = require('mysql2/promise');
const Importer = require('mysql-import');

const app = require('../index');
const tasksMocks = require('./mocks/tasks');

const { expect } = chai;
chai.use(chaiHttp);

const TASK_ENDPOINT = '/task';

describe('Implemente o endpoint GET /task', () => {
  let connection;

  before(async () => {
    connection = mysql.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    });

    const importer = new Importer({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    });

    await importer.import('./tasks.sql');

    importer.disconnect();
  });

  after(async () => {
    await connection.execute('DROP DATABASE Tasks_Manager');
    await connection.end();
  });

  it('Será validado que o endpoint retorna um array com todas as tarefas cadastradas', async () => {
    const response = await chai.request(app).get(TASK_ENDPOINT);

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(4);

    expect(response.body).to.be.deep.equal(tasksMocks);
  });

  it('Será validado que o endpoint retorna um array vazio caso não haja tarefas cadastradas', async () => {
    await connection.execute('DELETE FROM Tasks_Manager.Tasks');

    const response = await chai.request(app).get(TASK_ENDPOINT);

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(0);

    expect(response.body).to.be.deep.equal([]);
  });
});
