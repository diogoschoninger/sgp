import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.mjs'

// Configurando o router
const router = Router()

// Verificação do token JWT
const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization']

  jwt.verify(token, process.env.SERVER_JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid Authentication Token"
      }).end()
    }

    req.userEmail = decoded.userEmail

    next()
  })
}

// Definindo as rotas
router.post('/login', async (req, res) => {
  let body = req.body

  if (!body.email || !body.password) {
    return res.status(401).json({
      error: true,
      message: "Invalid body request. Expected {email, password}"
    }).end()
  }

  let user = await User.findOne({
    attributes: ['email', 'password'],
    where: {
      email: body.email
    }
  })

  if (!user) {
    return res.status(404).send({
      error: true,
      message: "Not Found. Invalid email"
    }).end()
  }

  if (!bcrypt.compareSync(body.password, user.password)) {
    return res.status(404).json({
      error: true,
      message: "Not Found. Invalid password"
    }).end()
  }

  const token = jwt.sign(
    { userEmail: user.email },
    process.env.SERVER_JWT_SECRET,
    { expiresIn: 900 }
  )

  res.status(200).json({
    auth: true,
    message: "User logged in",
    token
  }).end()
})

router.get('/users', verifyJWT, async (req, res) => {
  let users = await User.findAll()

  if (!users) {
    return res.status(404).json({
      message: "Not Found"
    }).end()
  }

  res.status(200).json(users).end()
})

export default router
