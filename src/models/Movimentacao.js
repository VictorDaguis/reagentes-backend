const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Movimentacao = sequelize.define('Movimentacao', {
  tipo: { type: DataTypes.ENUM('entrada', 'saida'), allowNull: false },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  data: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  responsavel: { type: DataTypes.STRING }
});

module.exports = Movimentacao;