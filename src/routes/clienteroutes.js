const express = require('express');
const route = express.Router();
const clienteController = require('../controller/clienteController');// Importa o controller de clientes 
const router = require('./routes');

//rota para lista todos os clientes
router.get ('/clientes', clienteController.listaCliente);

//rota para buscar um cliente por cpf 
router.get('/clientes/:cpf', clienteController.listaClienteCpf);

//rota para adicionar um novo cliente 
router.post('/clientes', clienteController.adicionarCliente);

//rota para atualizar um cliente por cpf
router.put('/clientes/;cpf', clienteController.atualizarCliente);

//rota para deletar um cliente por cpf
router.delete('/clientes/;cpf', clienteController.deletarCliente);

module.exports = router;