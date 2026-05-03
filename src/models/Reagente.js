const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reagente = sequelize.define('Reagente', {
  nome: { type: DataTypes.STRING, allowNull: false },
  categoria: { type: DataTypes.STRING },
  unidade: { type: DataTypes.STRING, defaultValue: 'un' },
  quantidade: { type: DataTypes.INTEGER, defaultValue: 0 },
  estoque_minimo: { type: DataTypes.INTEGER, defaultValue: 5 }
});

module.exports = Reagente;