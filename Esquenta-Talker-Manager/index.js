const express = require('express');
const fs = require('fs/promises');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get('/tasks', async (_req, res) => {
  const data = await fs.readFile('task.json');

  res.status(200).json(JSON.parse(data));
});

app.post('/tasks', async (req, res) => {
  const { authorization } = req.headers;
  const data = await fs.readFile('task.json');
  const newData = JSON.parse(data);
  const obj = {
    id: newData.length + 1, ...req.body
  }
  newData.push({ id: newData.length, ...req.body });
  await fs.writeFile('task.json', JSON.stringify(newData, null, 2));
  res.status(201).send(obj)
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Não excluir, exportação necessária para os testes!!!
module.exports = app;
