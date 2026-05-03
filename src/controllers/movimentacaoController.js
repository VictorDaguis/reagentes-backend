const movimentacaoService = require('../services/movimentacaoService');

exports.listar = async (req, res) => {
  try {
    const movs = await movimentacaoService.listar();
    res.json(movs);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const mov = await movimentacaoService.buscarPorId(req.params.id);
    if (!mov) return res.status(404).json({ erro: 'Movimentação não encontrada' });
    res.json(mov);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const dados = { ...req.body, usuarioId: req.usuarioId }; // pega do token
    const mov = await movimentacaoService.criar(dados);
    res.status(201).json(mov);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};