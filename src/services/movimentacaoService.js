const { Movimentacao, Reagente } = require('../models');

exports.listar = () => Movimentacao.findAll({ include: ['reagente', 'usuario'] });

exports.buscarPorId = (id) => Movimentacao.findByPk(id, { include: ['reagente', 'usuario'] });

exports.criar = async ({ tipo, quantidade, reagenteId, responsavel, usuarioId }) => {
  const reagente = await Reagente.findByPk(reagenteId);
  if (!reagente) throw new Error('Reagente não encontrado');

  if (tipo === 'saida' && reagente.quantidade < quantidade) {
    throw new Error('Estoque insuficiente');
  }

  const mov = await Movimentacao.create({ tipo, quantidade, data: new Date(), responsavel, reagenteId, usuarioId });

  // Atualiza o estoque do reagente
  const novaQtde = tipo === 'entrada'
    ? reagente.quantidade + quantidade
    : reagente.quantidade - quantidade;
  await reagente.update({ quantidade: novaQtde });

  return mov;
};