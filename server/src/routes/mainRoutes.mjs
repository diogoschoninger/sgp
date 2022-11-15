import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.mjs'
import FinOperations from '../models/FinOperations.mjs'

// Configurando o router
const router = Router()

// Função de verificação do token JWT
const verifyJWT = (req, res, next) => {
  // Obtém o token enviado pelo cabeçalho da requisição
  const token = req.headers['authorization-token']
  const id = req.headers['authorization-id']

  // Verifica se o token enviado é válido
  jwt.verify(token, process.env.SERVER_JWT_SECRET, (err, decoded) => {
    if (err || Number(id) !== decoded.id) {
      return res.json({ invalidToken: true }).end()
    }

    // Passa a execução para a próxima função middleware
    next()
  })
}

// DEFININDO AS ROTAS
// Login
router.post('/login', async (req, res) => {
  // Obtém o corpo da requisição
  let body = req.body

  // Verifica se os dados necessários para o login foram enviados
  if (!body.email || !body.password) {
    return res.json({
      error: true,
      message: "Dados inexistentes. Espera-se {email, password}"
    }).end()
  }

  // Busca um usuário no banco com email correspondente
  let user = await User.findOne({
    attributes: ['id', 'password'],
    where: {
      email: body.email
    }
  })

  // Caso não exista usuário cadastrado com o email, retorna um erro
  if (!user) {
    return res.json({
      error: true,
      message: "Nenhum usuário cadastrado com este email"
    }).end()
  }

  // Compara a senha informada com a senha salva no banco de dados e, caso não corresponda, retorna um erro
  if (!bcrypt.compareSync(body.password, user.password)) {
    return res.json({
      error: true,
      message: "Senha incorreta"
    }).end()
  }

  // Cria o token de autenticação
  const token = jwt.sign(
    { id: user.id }, // Utiliza o email do usuário
    process.env.SERVER_JWT_SECRET, // Chave secreta armazenada em variável de ambiente no servidor
    { expiresIn: 1800 } // Tempo de expiração, em segundos
  )

  // Retorna o sucesso do login, enviando também o token de autenticação para ser utilizado em requisições futuras
  res.json({
    auth: true,
    token,
    id: user.id
  }).end()
})

// Cadastro
router.post('/register', async (req, res) => {
  // Obtém o corpo da requisição
  let body = req.body

  // Verifica se os dados necessários para o login foram enviados
  if (!body.name || !body.email || !body.cpf || !body.password) {
    return res.json({
      error: true,
      message: "Corpo da requisição inválido. Espera-se {name, email, cpf, password}"
    }).end()
  }

  // Cripografa a senha
  const encryptedPassword = bcrypt.hashSync(body.password)

  // Executa a inserção do usuário no banco de dados e retorna um feedback do resultado
  await User.create({
    name: body.name,
    email: body.email,
    cpf: body.cpf,
    password: encryptedPassword
  })
    .then(result => res.json(result).end())
    .catch(error => res.json(error).end())
})

// Listagem de usuários
router.get('/users', verifyJWT, async (req, res) => {
  await User.findAll({
    attributes: ['id', 'name', 'email', 'cpf']
  })
    .then(result => res.json(result).end())
    .catch(error => res.json(error).end())
})

// Listagem de usuário por id
router.get('/users/:id', verifyJWT, async (req, res) => {
  await User.findOne({
    attributes: ['id', 'name', 'email', 'cpf'],
    where: {
      id: req.params.id
    }
  })
    .then(result => res.json(result).end())
    .catch(error => res.json(error).end())
})

// Listagem de operações financeiras por usuário
router.get('/users/:id/fin-operations', verifyJWT, async (req, res) => {
  await FinOperations.findAll({
    where: {
      user_owner: req.params.id
    }
  })
    .then(result => res.json(result).end())
    .catch(error => res.json(error).end())
})

export default router
