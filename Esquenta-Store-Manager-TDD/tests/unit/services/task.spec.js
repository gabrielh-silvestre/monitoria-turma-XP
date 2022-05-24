const chai = require('chai');
const sinon = require('sinon');

const { TaskModel } = require('../../../model/tasks.model');
const { TaskServices } = require('../../../services/tasks.service');

const { serializedTasks } = require('../../mocks/tasks');

const { expect } = chai;

/*
Funcionalidades:
  - Listar todos as tasks (findAll)
  - Criar task (create)
  - Atualizar task (update)
  - Deletar task (destroy)
*/

const NEW_TASK = {
  title: 'Projeto Store Manager',
  description: 'Iniciar o projeto Store Manager',
  completed: false,
};

const UPDATED_TASK = {
  ...NEW_TASK,
  id: 5,
  title: 'Projeto Store Manager - Atualizado',
  completed: true,
};

describe('Task Service - findAll', () => {
  before(() => {
    const stubModelFindAll = sinon.stub(TaskModel, 'findAll');
    stubModelFindAll.resolves(serializedTasks);
  });

  after(() => {
    TaskModel.findAll.restore();
  });

  it('should return an object with status code and data', async () => {
    const tasks = await TaskServices.findAll();

    expect(tasks).to.be.an('object');
    expect(tasks).to.have.property('statusCode', 200);
    expect(tasks).to.have.property('data', serializedTasks);
  });
});

describe('Task Service - create', () => {
  before(() => {
    const stubModelCreate = sinon.stub(TaskModel, 'create');
    stubModelCreate.resolves(NEW_TASK);

    const stubModelFindByTitle = sinon.stub(TaskModel, 'findByTitle');
    stubModelFindByTitle.onCall(0).resolves(null);
    stubModelFindByTitle.onCall(1).resolves(serializedTasks[0]);
  });

  after(() => {
    TaskModel.create.restore();
    TaskModel.findByTitle.restore();
  });

  it('should return an object with status code and data', async () => {
    const task = await TaskServices.create(NEW_TASK);

    expect(task).to.be.an('object');
    expect(task).to.have.property('statusCode', 201);
    expect(task).to.have.property('data', NEW_TASK);
  });

  it('should return an object with status code and message', async () => {
    const task = await TaskServices.create(NEW_TASK);

    expect(task).to.be.an('object');
    expect(task).to.have.property('statusCode', 409);
    expect(task).to.have.property('message', 'Task already exists');
  });
});

describe('Task Service - update', () => {
  before(() => {
    const stubModelUpdate = sinon.stub(TaskModel, 'update');
    stubModelUpdate.resolves(UPDATED_TASK);

    const stubModelFindById = sinon.stub(TaskModel, 'findById');
    stubModelFindById.onCall(0).resolves(UPDATED_TASK);
    stubModelFindById.onCall(1).resolves(null);
  });

  after(() => {
    TaskModel.findById.restore();
  });

  it('should return an object with status code and data', async () => {
    const task = await TaskServices.update(UPDATED_TASK);

    expect(task).to.be.an('object');
    expect(task).to.have.property('statusCode', 200);
    expect(task).to.have.property('data', UPDATED_TASK);
  });

  it('should return an object with status code and message', async () => {
    const task = await TaskServices.update({ ...UPDATED_TASK, id: 10 });

    expect(task).to.be.an('object');
    expect(task).to.have.property('statusCode', 404);
    expect(task).to.have.property('message', 'Task not found');
  });
});

describe('Task Service - destroy', () => {
  before(() => {
    const stubModelDestroy = sinon.stub(TaskModel, 'destroy');
    stubModelDestroy.resolves(null);

    const stubModelFindById = sinon.stub(TaskModel, 'findById');
    stubModelFindById.onCall(0).resolves(serializedTasks[0]);
    stubModelFindById.onCall(1).resolves(null);
  });

  after(() => {
    TaskModel.destroy.restore();
    TaskModel.findById.restore();
  });

  it('should return an object with status code and data', async () => {
    const task = await TaskServices.destroy({ id: 1 });

    expect(task).to.be.an('object');
    expect(task).to.have.property('statusCode', 204);
    expect(task).to.have.property('data', null);
  });

  it('should return an object with status code and message', async () => {
    const task = await TaskServices.destroy({ id: 10 });

    expect(task).to.be.an('object');
    expect(task).to.have.property('statusCode', 404);
    expect(task).to.have.property('message', 'Task not found');
  });
});
