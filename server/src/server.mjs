import express from 'express'
import dotenv from 'dotenv'
import setHeaders from './routes/setHeaders.mjs'
import mainRoutes from './routes/mainRoutes.mjs'

// Configurando express
const server = express()

// Configurando dotenv
dotenv.config()

// Habilitando o uso de dados enviados pelo corpo da requisição
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Definindo os conjuntos de rotas a serem utilizados
server.use('/', setHeaders, mainRoutes)

// Definindo a rota "404"
server.use((req, res) => {
  res.status(404).send({
    error: true,
    message: "Este endpoint não existe"
  })
})

// Definindo a porta onde o servidor backend irá executar
server.listen(process.env.SERVER_PORT)
