const { Usuario } = require('../models');

exports.listar = () => Usuario.findAll({ attributes: { exclude: ['senha'] } });

exports.buscarPorId = (id) => Usuario.findByPk(id, { attributes: { exclude: ['senha'] } });

exports.atualizar = (id, dados) => Usuario.update(dados, { where: { id } });

exports.deletar = (id) => Usuario.destroy({ where: { id } });