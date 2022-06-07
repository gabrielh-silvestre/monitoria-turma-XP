require('dotenv').config();
const express = require('express');

const { Sale, Product } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// temporary
app.get('/products', async (_req, res) => {
  const products = await Sale.findAll({
    include: [
      {
        model: Product,
        as: 'products',
        through: { attributes: [] },
      },
    ],
  });

  res.json(products);
});

module.exports = app;
