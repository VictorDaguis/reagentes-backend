const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Reagente = require('./Reagente');
const Movimentacao = require('./Movimentacao');
const Categoria = require('./Categoria');  // <-- ADICIONE ESTA LINHA

// Relacionamentos
Categoria.hasMany(Reagente, { foreignKey: 'categoriaId' });
Reagente.belongsTo(Categoria, { foreignKey: 'categoriaId' });

Reagente.hasMany(Movimentacao, { foreignKey: 'reagenteId', as: 'movimentacoes' });
Movimentacao.belongsTo(Reagente, { foreignKey: 'reagenteId', as: 'reagente' });

Usuario.hasMany(Movimentacao, { foreignKey: 'usuarioId', as: 'movimentacoes' });
Movimentacao.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

const db = { sequelize, Usuario, Reagente, Movimentacao, Categoria };

module.exports = db;