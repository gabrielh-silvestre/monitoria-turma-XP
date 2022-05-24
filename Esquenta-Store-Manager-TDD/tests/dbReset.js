require('dotenv').config();
const Importer = require('mysql-import');

const main = async () => {
  const importer = new Importer({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  });

  await importer.import('./tasks.sql');

  importer.disconnect();
};

main()
  .then(() => {
    console.log('Banco de dados resetado com sucesso!');
  })
  .catch(() => {
    console.log('Erro ao resetar o banco de dados!');
  });
