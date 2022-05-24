const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/talkers', routes);

app.use((err, req, res, next) => {
  console.log(err)
  if(err.status) return res.status(err.status).json({ message: err.message });

  return res.status(500).json({ message: 'Internal Server Error' })
});

app.listen(PORT, () => {
  console.log(`O pai ta on na porta ${PORT}`);
});
