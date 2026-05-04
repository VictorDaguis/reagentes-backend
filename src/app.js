const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/routes');
const { sequelize } = require('./models');

const app = express(); // <-- app criado aqui

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta 'public' (se quiser, veja observação abaixo)
app.use(express.static('public'));

// Rotas da API
app.use('/api', routes);

// Sincroniza banco e inicia servidor
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
  console.log('Banco conectado');
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});