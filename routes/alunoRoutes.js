const router = require('express').Router()
const moment = require('moment');

const Aluno = require('../models/Aluno');


// Método create - criação de dados
router.post('/', async (req, res) => {

    // req.body (corpo onde chega os dados)
    const { name, age, ra, cpf } = req.body;

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' });
        return; // Adicionado para interromper a execução após o erro
    }

    // Gera as datas createdAt e updatedAt usando Moment.js
    const currentDate = moment.utc().format();
    
    const aluno = {
        name,
        age,
        ra,
        cpf,
        createdAt: currentDate,
        updatedAt: currentDate
    };

    // método create do mongoose

    try {

        // criando dados

        await Aluno.create(aluno);
        // os numeros 201, 500 etc, são dos status http
        res.status(201).json({ message: 'Aluno inserido com sucesso!' });

    } catch (error) {
        res.status(500).json({ error: error });
    }

});


// Read - leitura de dados
router.get('/', async (req, res) => {
    
    let Name = req.query.Name
    

    if(Name){
        try {
            const aluno = await Aluno.find({name: Name})
            res.status(200).json(aluno)     
        }catch (error) {
            res.status(500).json({ error: error})
        }
    } else {
        res.status(422).json({ message: 'O Aluno não foi encontrado!'})
    }
    
});


// Update - atualização de dados (PUT, PATCH)
// PUT - objeto completo
// PATCH - atualização parcial

router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { name, age, ra, cpf } = req.body;

    const aluno = {
        name,
        age,
        ra,
        cpf,
    }

    try {

        const updatedAluno = await Aluno.updateOne({ _id: id}, aluno)

        console.log(updatedAluno)

        // validação se o usuário existe ou não, pois não posso atualizar algo que não existe

        if(updatedAluno.matchedCount === 0) {
            res.status(422).json({ message: 'Esse ID é inválido, o aluno não existe!'})
            return
        }

        res.status(200).json(aluno)

    }catch (error) {
        res.status(500).json({ error: error });
    }
})

// Delete - deletar dados

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const aluno = await Aluno.findOne({ _id: id})

    // validação, não da pra deletar se o id nao existe
    if(!aluno) {
        res.status(422).json({ message: 'Esse ID é inválido, o aluno não existe!'})
        return
    }

    try{

        await Aluno.deleteOne({ _id: id })

        res.status(200).json({ message: 'Aluno deletado com sucesso!'})

    }catch (error) {
        res.status(500).json({ error: error });
    }

})


module.exports = router