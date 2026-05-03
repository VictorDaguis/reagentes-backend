const authService = require('../services/authService');

exports.registrar = async (req, res) => {
  try {
    const usuario = await authService.registrar(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const resultado = await authService.login(email, senha);
    res.json(resultado);
  } catch (error) {
    res.status(401).json({ erro: error.message });
  }
};