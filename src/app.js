const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/routes');
const { sequelize } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

// Sincroniza banco e inicia servidor
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
  console.log('Banco conectado');
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});