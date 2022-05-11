const fs = require('fs');
const app = require('../index');

const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');

const { expect } = chai;
chai.use(chaiHttp);

describe('Implemente o endpoint DELETE /task/:id', () => {
  beforeEach(() => {
    const taskSeed = fs.readFileSync(path.join(__dirname, 'seed.json'), 'utf8');

    fs.writeFileSync(path.join(__dirname, '..', 'task.json'), taskSeed, 'utf8');
  });

  it('Será validado que é possível deletar uma tarefa com sucesso', async () => {
    const response = await chai.request(app).delete('/tasks/1');

    expect(response.status).to.equal(200);

    expect(response.body).to.be.empty;
  });

  it('Será validado que não é possível deletar uma tarefa que não existe', async () => {
    const response = await chai.request(app).delete('/tasks/5');

    expect(response.status).to.equal(404);

    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');

    expect(response.body).to.be.deep.equal({
      message: 'Task not found',
    });
  });
});
