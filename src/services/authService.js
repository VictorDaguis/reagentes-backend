const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.registrar = async (dados) => {
  const senhaHash = await bcrypt.hash(dados.senha, 10);
  const usuario = await Usuario.create({ ...dados, senha: senhaHash });
  const { senha, ...usuarioSemSenha } = usuario.toJSON();
  return usuarioSemSenha;
};

exports.login = async (email, senha) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error('Usuário não encontrado');
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error('Senha inválida');
  const token = jwt.sign(
    { id: usuario.id, papel: usuario.papel },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
  return { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } };
};