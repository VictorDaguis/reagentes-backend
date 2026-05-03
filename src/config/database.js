const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // arquivo local
  logging: false, // desabilita logs SQL no console
});

module.exports = sequelize;