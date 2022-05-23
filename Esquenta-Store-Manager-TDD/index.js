const express = require('express');
const rescue = require('express-rescue');
const { taskRoute } = require('./routes/task');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/task', taskRoute);

app.use(rescue.from(Error, (err, _req, res) => {
  res.status(500).json({ message: err.message });
}));

// Não excluir, exportação necessária para os testes!!!
module.exports = app;
