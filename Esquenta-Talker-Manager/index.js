const express = require('express');
const { taskRoute } = require('./routes/task');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/task', taskRoute);

// Não excluir, exportação necessária para os testes!!!
module.exports = app;
