const frisby = require('frisby');
const shell = require('shelljs');

const BASE_URL = 'http://localhost:3001';

describe('2- Testa o endpoint GET /sales', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop', { silent: true });
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate', {
      silent: true,
    });
    shell.exec('npx sequelize db:seed:all', { silent: true });
  });

  it('Deve retornar a lista de vendas com seus respectivos produtos', async () => {
    const response = await frisby
      .get(`${BASE_URL}/sales`)
      .expect('status', 200);

    const result = JSON.parse(response.body);

    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('date');
    expect(result[0]).toHaveProperty('products');

    expect(result[0].products).toBeInstanceOf(Array);
    expect(result[0].products[0]).toHaveProperty('id');
    expect(result[0].products[0]).toHaveProperty('name');
    expect(result[0].products[0]).toHaveProperty('quantity');
  });
});
