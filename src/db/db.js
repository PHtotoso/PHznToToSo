// configuração com o banco mysql

const mysql = require('mysql'); //importando mysql

//configurando uma conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'pizzariat',
}); //preencher de acordo com o seu banco de dados

//testar a conexão com o mysql
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao mysql', err);
    } else {
        console.log('Conectado ao mysql');
    }
});

module.exports = db;

//aqui declaramos que esta construção será um modulo e que iremos exportar para ser usado.