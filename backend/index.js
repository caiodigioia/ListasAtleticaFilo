// config inicial
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()


// forma de ler JSON
app.use (
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// rotas da API
const personRoutes = require('./routes/personRoutes.js')

app.use('/api', personRoutes)


// rota inicial / endpoint
app.get('/api/', (req, res) => {

    // mostrar req

    res.json({message: 'Oi, express!'})

})



// conecta ao BD
const DB_USER = 'caiodigioia'
const DB_PASSWORD = encodeURIComponent(process.env.SENHA_BD);

mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apilistasfilo.dq3vynj.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    ) .then (() => {
        console.log('Conectamos ao MongoDB! Servidor rodando!')
        app.listen(3000)
    })
.catch((err) => console.log(err))

// definir porta


