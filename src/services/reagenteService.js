const { Reagente } = require('../models');

exports.listar = () => Reagente.findAll();

exports.buscarPorId = (id) => Reagente.findByPk(id);

exports.criar = (dados) => Reagente.create(dados);

exports.atualizar = (id, dados) => {
  return Reagente.update(dados, { where: { id } });
};

exports.deletar = (id) => {
  return Reagente.destroy({ where: { id } });
};

exports.verificarEstoqueBaixo = async () => {
  const reagentes = await Reagente.findAll();
  return reagentes.filter(r => r.quantidade < r.estoque_minimo);
};