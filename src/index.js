//importação de dependências 
require('dotenv').config(); // carrega variaveis de ambiente de um arquivo  .env

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/routes');
const db = require('./db/db');

//inicialização do aplicativo
const app = express();
//middlewares de segurança e utilidades
app.use(helmet());//protege a aplicação com headers de segurança
app.use(cors());//habita o cors
app.use(morgan(`dev`));
app.use(express.json());//converte os dados recebidos 


//servindo arquivo estaticos
app.use(express.static(path.join(__dirname,'public'))); //pasta de arquivo estáticos

//rotas para servir home.html
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

//configuração de rotas
app.use('/', routes);

//Middleware de tratamento de erros
app.use((err, req, res, next)=> {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
})

//inicialização do servidor 
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});