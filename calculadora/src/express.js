//Import Express
const express = require("express")

//Cors
const cors = require('cors')

//Inicializa expresss
const app = express();

//Configura express
app.use(express.json());


//Cors
app.use(cors({
    origin:'*',
    methods: ["GET", 'PATCH', 'POST', 'DELETE'],
}))


//Rotas da API
const CalcRoutes = require('./routes/CalcRoutes')
app.use('/calc', CalcRoutes)

module.exports = app

