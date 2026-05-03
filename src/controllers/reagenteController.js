const reagenteService = require('../services/reagenteService');

exports.listar = async (req, res) => {
  try {
    const reagentes = await reagenteService.listar();
    res.json(reagentes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar reagentes' });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const reagente = await reagenteService.buscarPorId(req.params.id);
    if (!reagente) return res.status(404).json({ erro: 'Reagente não encontrado' });
    res.json(reagente);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar reagente' });
  }
};

exports.criar = async (req, res) => {
  try {
    const novo = await reagenteService.criar(req.body);
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar reagente' });
  }
};

exports.atualizar = async (req, res) => {
  try {
    await reagenteService.atualizar(req.params.id, req.body);
    res.json({ mensagem: 'Reagente atualizado' });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar reagente' });
  }
};

exports.deletar = async (req, res) => {
  try {
    await reagenteService.deletar(req.params.id);
    res.json({ mensagem: 'Reagente deletado' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar reagente' });
  }
};

exports.estoqueBaixo = async (req, res) => {
  try {
    const criticos = await reagenteService.verificarEstoqueBaixo();
    res.json(criticos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao verificar estoque' });
  }
};