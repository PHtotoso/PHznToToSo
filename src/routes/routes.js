const express = require('express');
const router = express.Router();

//exemplo de uma rota get
router.get('/exemplo', (req, res) => {
    res.send('Rota de exemplo'); 
});

//exemplo de outra rota get
router.get('/sandro', (req, res) => {
    res.send('Rota do sandro');
});
//exporte o roteador para que ele passa ser usado no index.js
module.exports = router