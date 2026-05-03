const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Reagente = require('./Reagente');
const Movimentacao = require('./Movimentacao');

// Relacionamentos
Reagente.hasMany(Movimentacao, { foreignKey: 'reagenteId', as: 'movimentacoes' });
Movimentacao.belongsTo(Reagente, { foreignKey: 'reagenteId', as: 'reagente' });

Categoria.hasMany(Reagente, { foreignKey: 'categoriaId' });
Reagente.belongsTo(Categoria, { foreignKey: 'categoriaId' });

Usuario.hasMany(Movimentacao, { foreignKey: 'usuarioId', as: 'movimentacoes' });
Movimentacao.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

const db = { sequelize, Usuario, Reagente, Movimentacao };

module.exports = db;