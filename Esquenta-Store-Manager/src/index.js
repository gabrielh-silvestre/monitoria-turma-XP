const express = require('express');
require('dotenv').config();
const talkersRoutes = require('./routes/talkersRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/talkers', talkersRoutes);

app.listen(PORT, () => {
  console.log(`O pai ta on na porta ${PORT}`);
});


