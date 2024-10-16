// configuração com o banco mysql

const mysql = require('mysql2/promise'); //importando mysql
require('dotenv').config();// carrega as variaveis de ambiente


//configurando uma conexão com o banco de dados
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}); //preencher de acordo com o seu banco de dados

//testar a conexão com o mysql
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        connection.release(); //libera a conexão de volta para o pool

    } catch (err){
        console.error('Erro ao conectar ao banco de dados:', err);
    }
})();
module.exports = db
//aqui declaramos que esta construção será um modulo e que iremos exportar para ser usado.