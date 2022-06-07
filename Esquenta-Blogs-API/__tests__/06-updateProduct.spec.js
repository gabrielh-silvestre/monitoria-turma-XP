const frisby = require('frisby');
const shell = require('shelljs');

const BASE_URL = 'http://localhost:3001';

describe('5 - Testa o endpoint PUT /products', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
    shell.exec('npx sequelize-cli db:seed:all');
  });

  it('Deve atualizar um produto', async () => {
    const response = await frisby
      .put(`${BASE_URL}/products/1`, {
        name: 'Martelo do Hulk',
        quantity: 20,
      })
      .expect('status', 200);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('id', 1);
    expect(result).toHaveProperty('name', 'Martelo do Hulk');
    expect(result).toHaveProperty('quantity', 20);
  });

  it('Não deve atualizar um produto inexistente', async () => {
    const response = await frisby
      .put(`${BASE_URL}/products/100`, {
        name: 'Martelo do Hulk',
        quantity: 20,
      })
      .expect('status', 404);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('message', 'Product not found');
  });

  it('Não deve atualizar um produto sem nome', async () => {
    const response = await frisby
      .put(`${BASE_URL}/products/1`, {
        quantity: 20,
      })
      .expect('status', 400);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('message', '"name" is required');
  });

  it('Não deve atualizar um produto sem quantidade', async () => {
    const response = await frisby
      .put(`${BASE_URL}/products/1`, {
        name: 'Martelo do Hulk',
      })
      .expect('status', 400);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('message', '"quantity" is required');
  });

  it('Não deve atualizar um produto com quantidade inválida', async () => {
    const response = await frisby
      .put(`${BASE_URL}/products/1`, {
        name: 'Martelo do Hulk',
        quantity: -1,
      })
      .expect('status', 422);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty(
      'message',
      '"quantity" must be a positive number'
    );
  });

  it('Não deve atualizar um produto com nome inválido', async () => {
    const response = await frisby
      .put(`${BASE_URL}/products/1`, {
        name: '',
        quantity: 20,
      })
      .expect('status', 422);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty(
      'message',
      '"name" is not allowed to be empty'
    );
  });

  it('Deve alterar os campos de um produto', async () => {
    const response = await frisby
      .get(`${BASE_URL}/products`)
      .expect('status', 200);

    const result = JSON.parse(response.body);

    expect(result[0]).toHaveProperty('id', 1);
    expect(result[0]).toHaveProperty('name', 'Martelo do Hulk');
    expect(result[0]).toHaveProperty('quantity', 20);
  });
});
