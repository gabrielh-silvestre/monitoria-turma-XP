const express = require('express');
const rescue = require('express-rescue');

const { errorHandler } = require('./middlewares/errorHandler');
const { taskRoute } = require('./routes/task');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use('/task', taskRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(rescue.from(Error, errorHandler));

// Não excluir, exportação necessária para os testes!!!
module.exports = app;
