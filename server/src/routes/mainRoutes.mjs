import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.mjs'

// Configurando o router
const router = Router()

// Função de verificação do token JWT
const verifyJWT = (req, res, next) => {
  // Obtém o token enviado pelo cabeçalho da requisição
  const token = req.headers['authorization']

  // Retorna um erro, caso nenhum token for enviado
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'Nenhum token enviado'
    })
  }

  // Verifica se o token enviado é válido
  jwt.verify(token, process.env.SERVER_JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: true,
        auth: false,
        message: "Token de autenticação inválido"
      }).end()
    }

    // Salva o email do usuário para uso posterior
    req.userEmail = decoded.userEmail

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
    return res.status(401).json({
      error: true,
      message: "Dados inexistentes. Espera-se {email, password}"
    }).end()
  }

  // Busca um usuário no banco com email correspondente
  let user = await User.findOne({
    attributes: ['email', 'password'],
    where: {
      email: body.email
    }
  })

  // Caso não exista usuário cadastrado com o email, retorna um erro
  if (!user) {
    return res.status(404).json({
      error: true,
      message: "Nenhum usuário cadastrado com este email"
    }).end()
  }

  // Compara a senha informada com a senha salva no banco de dados e, caso não corresponda, retorna um erro
  if (!bcrypt.compareSync(body.password, user.password)) {
    return res.status(404).json({
      error: true,
      message: "Senha incorreta"
    }).end()
  }

  // Cria o token de autenticação
  const token = jwt.sign(
    { userEmail: user.email }, // Utiliza o email do usuário
    process.env.SERVER_JWT_SECRET, // Chave secreta armazenada em variável de ambiente no servidor
    { expiresIn: 900 } // Tempo de expiração, em segundos
  )

  // Retorna o sucesso do login, enviando também o token de autenticação para ser utilizado em requisições futuras
  res.status(200).json({
    auth: true,
    message: "Login efetuado com sucesso",
    token
  }).end()
})

// Cadastro
router.post('/register', async (req, res) => {
  // Obtém o corpo da requisição
  let body = req.body

  // Verifica se os dados necessários para o login foram enviados
  if (!body.name || !body.email || !body.cpf || !body.password) {
    return res.status(401).json({
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
  }).then(user => (
    res.status(200).json({
      registered: true,
      message: 'Usuário cadastrado com sucesso'
    })
  )).catch(error => (
    res.status(406).json({
      error: true,
      type: error.name,
      message: error.errors[0]
    })
  ))
})

export default router
