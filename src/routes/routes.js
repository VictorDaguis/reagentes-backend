const express = require('express');
const authController = require('../controllers/authController');
const usuarioController = require('../controllers/usuarioController');
// const reagenteController = require('../controllers/reagenteController');
// const movimentacaoController = require('../controllers/movimentacaoController');
const authMiddleware = require('../middlewares/authMiddleware');
const reagenteController = require('../controllers/reagenteController');
const router = express.Router();

// Auth (público)
router.post('/registrar', authController.registrar);
router.post('/login', authController.login);

// CRUD Usuários (protegido)
router.get('/usuarios', authMiddleware, usuarioController.listar);
router.get('/usuarios/:id', authMiddleware, usuarioController.buscarPorId);
router.put('/usuarios/:id', authMiddleware, usuarioController.atualizar);
router.delete('/usuarios/:id', authMiddleware, usuarioController.deletar);

// Reagentes (protegido) – a implementar
router.get('/reagentes', authMiddleware, reagenteController.listar);
router.get('/reagentes/estoque-baixo', authMiddleware, reagenteController.estoqueBaixo);
router.get('/reagentes/:id', authMiddleware, reagenteController.buscarPorId);
router.post('/reagentes', authMiddleware, reagenteController.criar);
router.put('/reagentes/:id', authMiddleware, reagenteController.atualizar);
router.delete('/reagentes/:id', authMiddleware, reagenteController.deletar);
// router.get('/reagentes', authMiddleware, reagenteController.listar);
// ...

module.exports = router;