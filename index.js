require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();



// forma de ler JSON - middlewares
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

// Rotas reais da API

const alunoRoutes = require('./routes/alunoRoutes')

app.use('/aluno', alunoRoutes)

// Rota Inicial - para testar no postman

app.get('/', (req, res) => {

    res.json({ message: 'Hello Express!' });
});

// entregar uma porta

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.puuvrho.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('MongoDB Conectado!');
        app.listen(5000);
    })
    .catch((err) => console.log(err));
