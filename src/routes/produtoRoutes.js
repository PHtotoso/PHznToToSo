const express = require('express');
const route = express.Router();
const produtoController = require('../controller/produtoController');
const router = require('./routes');


router.get ('/produtos', produtoController.listaProdutos);

router.get ('/produtos/:id', produtoController.buscaProdutoId);

router.get('/produtos/nome/:nomeProduto', produtoController.buscarProdutoNome);

router.post ('/produtos', produtoController.adicionarProduto);

router.put ('/produtos/:id', produtoController.atualizarProduto);

router.delete('/produtos/:id', produtoController.deletarProduto);
module.exports = router;