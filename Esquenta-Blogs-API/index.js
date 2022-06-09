require('dotenv').config();
const express = require('express');
const rescue = require('express-rescue');

const router = require('./routes');
const ErrorHandler = require('./middleware/error.handler');

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use(router);

app.use(rescue.from(Error, ErrorHandler));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
