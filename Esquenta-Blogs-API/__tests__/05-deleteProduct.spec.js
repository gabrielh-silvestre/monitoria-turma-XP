const frisby = require('frisby');
const shell = require('shelljs');

const BASE_URL = 'http://localhost:3001';

describe('5 - Testa o endpoint DELETE /products/:id', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
    shell.exec('npx sequelize-cli db:seed:all');
  });

  it('Deve deletar um produto', async () => {
    const response = await frisby
      .delete(`${BASE_URL}/products/1`)
      .expect('status', 204);

    expect(response.body).toBeEmpty();
  });

  it('Não deve deletar um produto inexistente', async () => {
    const response = await frisby
      .delete(`${BASE_URL}/products/100`)
      .expect('status', 404);

    const result = JSON.parse(response.body);

    expect(result).toHaveProperty('message', 'Product not found');
  });

  it('Deve deletar o produto e suas vendas', async () => {
    const productsResponse = await frisby
      .get(`${BASE_URL}/products`)
      .expect('status', 200);

    const products = JSON.parse(productsResponse.body);

    expect(products).toBeInstanceOf(Array);
    expect(products).toHaveLength(2);
    expect(products[0]).toHaveProperty('id', 2);
    expect(products[0]).toHaveProperty('name', 'Traje de encolhimento');
    expect(products[0]).toHaveProperty('quantity', 20);

    expect(products[1]).toHaveProperty('id', 3);
    expect(products[1]).toHaveProperty('name', 'Escudo do Capitão América');
    expect(products[1]).toHaveProperty('quantity', 30);

    const salesResponse = await frisby
      .get(`${BASE_URL}/sales`)
      .expect('status', 200);

    const sales = JSON.parse(salesResponse.body);

    expect(sales).toBeInstanceOf(Array);
    expect(sales).toHaveLength(2);

    expect(sales[0]).toHaveProperty('id');
    expect(sales[0]).toHaveProperty('date');
    expect(sales[0]).toHaveProperty('products');

    expect(sales[0].products).toBeInstanceOf(Array);
    expect(sales[0].products).toHaveLength(2);
    expect(sales[0].products[0]).toHaveProperty('id');
    expect(sales[0].products[0]).toHaveProperty(
      'name',
      'Traje de encolhimento'
    );
    expect(sales[0].products[0]).toHaveProperty('quantity', 20);

    expect(sales[1].products[0]).toHaveProperty('id');
    expect(sales[1].products[0]).toHaveProperty(
      'name',
      'Escudo do Capitão América'
    );
    expect(sales[1].products[0]).toHaveProperty('quantity', 30);
  });
});
