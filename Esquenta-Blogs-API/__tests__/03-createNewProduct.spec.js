const frisby = require('frisby');
const shell = require('shelljs');

const BASE_URL = 'http://localhost:3001';

describe('3 - Testa o endpoint POST /products', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop', { silent: true });
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate', { silent: true });
  });

  it('Deve criar um novo produto', async () => {
    const response = await frisby
      .post(`${BASE_URL}/products`, {
        name: 'Capa superman',
        quantity: 50,
      })
      .expect('status', 201);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('quantity');
  });

  it('Não deve criar um novo produto sem nome', async () => {
    const response = await frisby
      .post(`${BASE_URL}/products`, {
        quantity: 50,
      })
      .expect('status', 400);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('message', '"name" is required');
  });

  it('Não deve criar um novo produto com nome inválido', async () => {
    const response = await frisby
      .post(`${BASE_URL}/products`, {
        name: 0,
        quantity: 50,
      })
      .expect('status', 422);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('message', '"name" must be a string');
  });

  it('Não deve criar um novo produto com nome vazio', async () => {
    const response = await frisby
      .post(`${BASE_URL}/products`, {
        name: '',
        quantity: 50,
      })
      .expect('status', 422);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty(
      'message',
      '"name" is not allowed to be empty'
    );
  });

  it('Não deve criar um novo produto sem quantidade', async () => {
    const response = await frisby
      .post(`${BASE_URL}/products`, {
        name: 'Capa superman',
      })
      .expect('status', 400);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('message', '"quantity" is required');
  });

  it('Não deve criar um novo produto com quantidade inválida', async () => {
    const response = await frisby
      .post(`${BASE_URL}/products`, {
        name: 'Capa superman',
        quantity: 'abc',
      })
      .expect('status', 422);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('message', '"quantity" must be a number');
  });

  it('Não deve criar um novo produto com quantidade negativa', async () => {
    const response = await frisby
      .post(`${BASE_URL}/products`, {
        name: 'Capa superman',
        quantity: -1,
      })
      .expect('status', 422);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty(
      'message',
      '"quantity" must be a positive number'
    );
  });

  it('Não deve criar um novo produto com quantidade zero', async () => {
    const response = await frisby
      .post(`${BASE_URL}/products`, {
        name: 'Capa superman',
        quantity: 0,
      })
      .expect('status', 422);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty(
      'message',
      '"quantity" must be a positive number'
    );
  });

  it('Deve conter somente um produto criado', async () => {
    await frisby
    .post(`${BASE_URL}/products`, {
      name: 'Capa superman',
      quantity: 50,
    })
    .expect('status', 201);

    const response = await frisby
      .get(`${BASE_URL}/products`)
      .expect('status', 200);

    const result = JSON.parse(response.body);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name', 'Capa superman');
    expect(result[0]).toHaveProperty('quantity', 50);
  });
});
