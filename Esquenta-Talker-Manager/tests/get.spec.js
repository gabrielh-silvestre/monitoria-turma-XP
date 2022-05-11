const fs = require('fs');
const app = require('../index');
const tasksSeed = require('../task.json');

const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');

const { expect } = chai;
chai.use(chaiHttp);

const TASK_ENDPOINT = '/task';

describe('Implemente o endpoint GET /task', () => {
  beforeEach(() => {
    const taskSeed = fs.readFileSync(path.join(__dirname, 'seed.json'), 'utf8');

    fs.writeFileSync(path.join(__dirname, '..', 'task.json'), taskSeed, 'utf8');
  });

  it('Será validado que o endpoint retorna um array com todas as tarefas cadastradas', async () => {
    const response = await chai.request(app).get(TASK_ENDPOINT);

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(4);

    expect(response.body).to.be.deep.equal(tasksSeed);
  });

  it('Será validado que o endpoint retorna um array vazio caso não haja tarefas cadastradas', async () => {
    fs.writeFileSync(path.join(__dirname, '..', 'task.json'), '[]', 'utf8');

    const response = await chai.request(app).get(TASK_ENDPOINT);

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(0);

    expect(response.body).to.be.deep.equal([]);
  });
});
