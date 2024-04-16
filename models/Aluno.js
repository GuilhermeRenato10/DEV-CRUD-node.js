const mongoose = require('mongoose')

const Aluno = mongoose.model('Aluno',{
    name: String,
    age: Number,
    ra: String,
    cpf: String,
    createdAt: String,
    updatedAt: String,
})

module.exports = Aluno