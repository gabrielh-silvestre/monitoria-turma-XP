const frisby = require('frisby');
const shell = require('shelljs');

const BASE_URL = 'http://localhost:3001';

describe('4 - Testa o endpoint POST /sales', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop', { silent: true });
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate', {
      silent: true,
    });
    shell.exec('npx sequelize-cli db:seed --seed 20220606191737-products.js', {
      silent: true,
    });
  });

  it('Deve criar uma nova venda', async () => {
    const response = await frisby
      .post(`${BASE_URL}/sales`, [
        {
          productId: 1,
          quantity: 5,
        },
        {
          productId: 2,
          quantity: 10,
        },
      ])
      .expect('status', 201);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('date');
  });

  it('Não deve criar uma nova venda sem produtos', async () => {
    const response = await frisby
      .post(`${BASE_URL}/sales`, [])
      .expect('status', 400);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('message', '"products" is required');
  });

  it('Não deve criar uma nova venda com quantidades inválidas', async () => {
    const response = await frisby
      .post(`${BASE_URL}/sales`, [
        {
          productId: 1,
          quantity: -1,
        },
        {
          productId: 2,
          quantity: -10,
        },
      ])
      .expect('status', 422);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty(
      'message',
      '"quantity" must be a positive number'
    );
  });

  it('Não deve criar uma nova venda com produtos inexistentes', async () => {
    const response = await frisby
      .post(`${BASE_URL}/sales`, [
        {
          productId: 98,
          quantity: 5,
        },
        {
          productId: 99,
          quantity: 10,
        },
      ])
      .expect('status', 404);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('message', 'Product not found');
  });

  it('Não deve criar uma nova venda com produtos sem quantidade', async () => {
    const response = await frisby
      .post(`${BASE_URL}/sales`, [
        {
          productId: 1,
          quantity: 5,
        },
        {
          productId: 2,
        },
      ])
      .expect('status', 400);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('message', '"quantity" is required');
  });

  it('Não deve criar uma nova venda sem produtos', async () => {
    const response = await frisby
      .post(`${BASE_URL}/sales`, [
        {
          quantity: 5,
        },
        {
          productId: 2,
          quantity: 10,
        },
      ])
      .expect('status', 400);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('message', '"productId" is required');
  });

  it('Deve conter somente a venda criada', async () => {
    await frisby
      .post(`${BASE_URL}/sales`, [
        { productId: 1, quantity: 5 },
        { productId: 2, quantity: 10 },
      ])
      .expect('status', 201);

    const response = await frisby
      .get(`${BASE_URL}/sales`)
      .expect('status', 200);

    const result = JSON.parse(response.body);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);

    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('date');
    expect(result[0]).toHaveProperty('products');

    expect(result[0].products).toBeInstanceOf(Array);
    expect(result[0].products[0]).toHaveProperty('id');
    expect(result[0].products[0]).toHaveProperty('name', 'Martelo do Thor');
    expect(result[0].products[0]).toHaveProperty('quantity', 5);

    expect(result[0].products[1]).toHaveProperty('id');
    expect(result[0].products[1]).toHaveProperty(
      'name',
      'Traje de encolhimento'
    );
    expect(result[0].products[1]).toHaveProperty('quantity', 10);
  });

  it('Deve diminuir a quantidade dos produtos', async () => {
    await frisby
      .post(`${BASE_URL}/sales`, [
        { productId: 1, quantity: 5 },
        { productId: 2, quantity: 10 },
      ])
      .expect('status', 201);

    const response = await frisby
      .get(`${BASE_URL}/products`)
      .expect('status', 200);

    const result = JSON.parse(response.body);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);

    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name', 'Martelo do Thor');
    expect(result[0]).toHaveProperty('quantity', 5);

    expect(result[1]).toHaveProperty('id');
    expect(result[1]).toHaveProperty('name', 'Traje de encolhimento');
    expect(result[1]).toHaveProperty('quantity', 10);

    expect(result[2]).toHaveProperty('id');
    expect(result[2]).toHaveProperty('name', 'Escudo do Capitão América');
    expect(result[2]).toHaveProperty('quantity', 30);
  });
});
