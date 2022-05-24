const chai = require('chai');
const sinon = require('sinon');

const { connection } = require('../../../model/connection');
const { TaskModel } = require('../../../model/tasks.model');

const { dbTasks, serializedTasks } = require('../../mocks/tasks');

const { expect } = chai;

/*
Funcionalidades:
  - Listar todos as tasks (findAll)
  - Listar uma task por ID (findById)
  - Listar uma task por título (findByTitle)
  - Criar task (create)
  - Atualizar task (update)
  - Deletar task (destroy)
*/

describe('Task Model - findAll', () => {
  before(() => {
    const stubConnectionExecute = sinon.stub(connection, 'execute');
    stubConnectionExecute.onCall(0).resolves([dbTasks]);
    stubConnectionExecute.onCall(1).resolves([[]]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('should return an array of tasks', async () => {
    const tasks = await TaskModel.findAll();

    expect(tasks).to.be.an('array');
    expect(tasks).to.be.deep.equal(serializedTasks);
  });

  it('should return an empty array if there are no tasks', async () => {
    const tasks = await TaskModel.findAll();

    expect(tasks).to.be.an('array');
    expect(tasks).to.have.lengthOf(0);
  });
});

describe('Task Model - findById', () => {
  before(() => {
    const stubConnectionExecute = sinon.stub(connection, 'execute');
    stubConnectionExecute.onCall(0).resolves([[serializedTasks[0]]]);
    stubConnectionExecute.onCall(1).resolves([[]]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('should return a task by ID', async () => {
    const task = await TaskModel.findById({ id: 1 });

    expect(task).to.have.property('id');
    expect(task).to.have.property('title');
    expect(task).to.have.property('description');
    expect(task).to.have.property('completed');
  });

  it('should return null if there is no task with that ID', async () => {
    const task = await TaskModel.findById({ id: 10 });

    expect(task).to.be.null;
  });
});

describe('Task Model - findByTitle', () => {
  before(() => {
    const stubConnectionExecute = sinon.stub(connection, 'execute');
    stubConnectionExecute.onCall(0).resolves([[serializedTasks[0]]]);
    stubConnectionExecute.onCall(1).resolves([[]]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('should return a task by title', async () => {
    const task = await TaskModel.findByTitle({ title: 'Ler o Course' });

    expect(task).to.have.property('id');
    expect(task).to.have.property('title');
    expect(task).to.have.property('description');
    expect(task).to.have.property('completed');
  });

  it('should return null if there is no task with that title', async () => {
    const task = await TaskModel.findByTitle({ title: 'Trem' });

    expect(task).to.be.null;
  });
});

describe('Task Model - create', () => {
  before(() => {
    const stubConnectionExecute = sinon.stub(connection, 'execute');
    stubConnectionExecute.resolves([[{ insertId: 5 }]]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('should create a task', async () => {
    const task = await TaskModel.create({
      title: 'Projeto Store Manager',
      description: 'Iniciar o projeto Store Manager',
      completed: false,
    });

    expect(task).to.have.property('id');
    expect(task).to.have.property('title');
    expect(task).to.have.property('description');
    expect(task).to.have.property('completed');
  });
});

describe('Task Model - update', () => {
  before(() => {
    const stubConnectionExecute = sinon.stub(connection, 'execute');
    stubConnectionExecute.resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('should update a task', async () => {
    const task = await TaskModel.update({
      id: 1,
      title: 'Ler o Course',
      description: 'Ver o Bloco 22.3',
      completed: false,
    });

    expect(task).to.have.property('id');
    expect(task).to.have.property('title');
    expect(task).to.have.property('description');
    expect(task).to.have.property('completed');
  });
});

describe('Task Model - destroy', () => {
  before(() => {
    const stubConnectionExecute = sinon.stub(connection, 'execute');
    stubConnectionExecute.resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('should destroy a task', async () => {
    const task = await TaskModel.destroy({ id: 1 });

    expect(task).to.be.undefined;
  });
});
