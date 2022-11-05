// Importando as dependências
import express from 'express'
import dotenv from 'dotenv'

// Importando componentes de rotas
import mainRoutes from './routes/mainRoutes.mjs'
import setHeaders from './setHeaders.mjs'

// Configurando dotenv
dotenv.config()

// Configurando express
const server = express()

// Habilitando o uso de dados enviados pelo corpo da requisição
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Definindo os conjuntos de rotas a serem utilizados
server.use('/', setHeaders, mainRoutes)

// Definindo a página 404
server.use((req, res) => {
  res.status(404).send({
    error: true,
    message: "Página não encontrada"
  })
})

// Definindo a porta onde o servidor backend irá executar
server.listen(process.env.SERVER_PORT)
