const db = require('../db/db'); // modulo de conexao com o banco de dados
const Joi = require('joi'); // Biblioteca de validação de dados 
const bcrypt = require('bcrypt'); //para enciptação de senhas

//validação com joi 
const clienteSchema = Joi.object({
    cpf: Joi.string().length(11).require(),//CPF deve ser uma string de extamente 11 caracteres
    nome: Joi.string().required().max(50),
    //nome deve ser uma string e é obrigatório 
    endereco: Joi.string().required().max(100),
    bairro: Joi.string().required().max(30),
    cidade: Joi.string().required().max(30),
    telefone: Joi.string().required(),
    senha: Joi.string().min(6).required()
});

exports.listaCliente = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM cliente');
        res.json(result); //aqui retornamos apenas os dados da consulta 
    } catch (err){
        console.error('Erro ao buscar clientes:', err);
        res.status(500).json({error: 'Erro interno do servidor'})
    }
};

exports.listaClienteCpf = async (req, res) =>{
    const {cpf} = req.params;
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({error: 'Cliente não encontrado'});
        }
        res.json(result[0]);

    } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor'});
    }
};

exports.deletarCliente = async (req, res) => {
    const { cpf} = req.params;
    try {
        await db.query('DELETE FROM cliente WHERE cpf = ?', [cpf]);
        res.json({message: 'Cliente deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).json({ error: 'Erro ao deletar cliente'});
    }
};