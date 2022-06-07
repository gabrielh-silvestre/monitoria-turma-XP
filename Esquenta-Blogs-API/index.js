require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
