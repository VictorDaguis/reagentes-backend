const usuarioService = require('../services/usuarioService');

exports.listar = async (req, res) => {
  const usuarios = await usuarioService.listar();
  res.json(usuarios);
};

exports.buscarPorId = async (req, res) => {
  const usuario = await usuarioService.buscarPorId(req.params.id);
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
  res.json(usuario);
};

exports.atualizar = async (req, res) => {
  await usuarioService.atualizar(req.params.id, req.body);
  res.json({ mensagem: 'Usuário atualizado' });
};

exports.deletar = async (req, res) => {
  await usuarioService.deletar(req.params.id);
  res.json({ mensagem: 'Usuário deletado' });
};