const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const talkersRoutes = require('./routes/talkersRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/talkers', talkersRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`O pai ta on na porta ${PORT}`);
});


