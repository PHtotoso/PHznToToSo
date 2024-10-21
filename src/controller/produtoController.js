const db = require('../db/db');
const Joi = require('joi');

const produtoSchema= Joi.object({
    nomeProduto: Joi.string().required(),
    descricao: Joi.string().required(),
    valorUnit: Joi.string().required(),
    imagem: Joi.string().allow('')
})

exports.listaProdutos = async (req, res) => {
    try{
        const[result] = await db.query('SELECT * FROM  produto');
        res.json(result);
    
    }catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).json({ error: 'Erro interno do servidor'});
    }
};

exports.buscaProdutoId = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('SELECT * FROM produto WHERE codigoProduto = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado'});
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar produto:', err);
        res.status(500).json({ error: 'Erro interno do servidor'})

     }
};

exports.buscarProdutoNome = async (req, res) => {
    const { nomeProduto } = req.params;

    try{
        const [result] = await db.query('SELECT * FROM produto WHERE nomeProduto like?', [`${nomeProduto}%`]);
        if (result.length === 0 ) {
            return res.status(404).json({ error: 'Produto Não encontrado'});
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar produto;', err);
        res.status(500).json({error: 'Erro interno do servidor'});
    }

}

exports.adicionarProduto = async (req, res) => {
    const {nomeProduto, descricao, valorUnit, imagem } = req.body;
    //validação dos dados com joi
    const { error } = produtoSchema.validate({ nomeProduto, descricao, valorUnit, imagem})

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const novoProduto = { nomeProduto, descricao, valorUnit, imagem };
    try {
        await db.query('INSERT INTO produto SET ?', novoProduto);
        res.json({ message: 'Produto adicionado com sucesso'});
    
    } catch (err){
        console.error('Erro ao adicionar produto:', err);
        res.status(500).json({ error: 'Erro ao adicionar produto'});
    }
}

exports.atualizarProduto = async( req, res) => {
    const {id} = req.params;
    const { nomeProduto, descricao, valorUnit, imagem } = req.body

    const{ error }= produtoSchema.validate({ nomeProduto, descricao, valorUnit, imagem});
    if (error) {
        return res.status(400).json({ error: error.details[0].message});
    }
    const produtoAtualizado = {nomeProduto, descricao, valorUnit, imagem};
     try{
        await db.query('UPDATE cliente SET? WHERE codigoProduto =',[produtoAtualizado, id]);
        res.json({ message: 'Produto atualizado com sucesso'});
     } catch (err){
        console.error('Erro ao atualizar produto:', err);
        res.status(500).json({ error: 'Erro ao atualizar produto'})
    }
};

exports.deletarProduto = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM produto WHERE codigoProduto = ?', [id]);
        res.json({ message: 'Produto deletado com sucesso'});

    } catch (err) {
        await db.query('DELETE FROM produto WHERE codigoProduto = ?', err);
        res.status(500).json({ error: 'Erro ao deletar produto'})
    }
};

   
        