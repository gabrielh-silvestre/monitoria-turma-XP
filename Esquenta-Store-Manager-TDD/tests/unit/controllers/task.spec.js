const chai = require('chai');
const sinon = require('sinon');

const { TaskServices } = require('../../../services/tasks.service');
const { TaskController } = require('../../../controllers/tasks.controller');

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

const response = {};
const request = {};
const next = {
  next: (args) => {},
};
const nextSpy = sinon.spy(next, 'next');

describe('Task Controller - findAll', () => {
  before(() => {
    const stubServiceFindAll = sinon.stub(TaskServices, 'findAll');
    stubServiceFindAll.resolves({
      statusCode: 200,
      data: serializedTasks,
    });

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
  });

  after(() => {
    TaskServices.findAll.restore();
  });

  it('should return an response with status code 200 and tasks as JSON', async () => {
    await TaskController.findAll(request, response);

    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(serializedTasks)).to.be.true;
  });
});

describe('Task Controller - create', () => {
  before(() => {
    const stubServiceCreate = sinon.stub(TaskServices, 'create');
    stubServiceCreate.onCall(0).resolves({
      statusCode: 201,
      data: NEW_TASK,
    });
    stubServiceCreate.onCall(1).resolves({
      statusCode: 409,
      message: 'Task already exists',
    });

    request.body = NEW_TASK;

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
  });

  after(() => {
    TaskServices.create.restore();
  });

  it('should return an response with status code 201 and created task as JSON', async () => {
    await TaskController.create(request, response, next.next);

    expect(response.status.calledWith(201)).to.be.true;
    expect(response.json.calledWith(NEW_TASK)).to.be.true;
  });

  it('should call next middleware', async () => {
    await TaskController.create(request, response, next.next);

    expect(
      nextSpy.calledWith({ statusCode: 409, message: 'Task already exists' })
    ).to.be.true;
  });
});

describe('Task Controller - update', () => {
  before(() => {
    const stubServiceUpdate = sinon.stub(TaskServices, 'update');
    stubServiceUpdate.onCall(0).resolves({
      statusCode: 200,
      data: UPDATED_TASK,
    });
    stubServiceUpdate.onCall(1).resolves({
      statusCode: 404,
      message: 'Task not found',
    });

    request.params = { id: 5 };
    request.body = UPDATED_TASK;

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
  });

  after(() => {
    TaskServices.update.restore();
  });

  it('should return an response with status code 200 and updated task as JSON', async () => {
    await TaskController.update(request, response, next.next);

    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(UPDATED_TASK)).to.be.true;
  });

  it('should call next middleware', async () => {
    await TaskController.update(request, response, next.next);

    expect(nextSpy.calledWith({ statusCode: 404, message: 'Task not found' }))
      .to.be.true;
  });
});

describe('Task Controller - destroy', () => {
  before(() => {
    const stubServiceDestroy = sinon.stub(TaskServices, 'destroy');
    stubServiceDestroy.onCall(0).resolves({
      statusCode: 204,
      data: null,
    });
    stubServiceDestroy.onCall(1).resolves({
      statusCode: 404,
      message: 'Task not found',
    });

    request.params = { id: 5 };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
  });

  after(() => {
    TaskServices.destroy.restore();
  });

  it('should return an response with status code 204 and data null', async () => {
    await TaskController.destroy(request, response, next.next);

    expect(response.status.calledWith(204)).to.be.true;
    expect(response.json.calledWith()).to.be.true;
  });

  it('should call next middleware', async () => {
    await TaskController.destroy(request, response, next.next);

    expect(nextSpy.calledWith({ statusCode: 404, message: 'Task not found' }))
      .to.be.true;
  });
});
