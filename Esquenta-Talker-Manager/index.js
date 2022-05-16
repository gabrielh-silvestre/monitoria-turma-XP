const express = require('express');
const fs = require('fs/promises');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

// Não excluir, exportação necessária para os testes!!!
module.exports = app;
