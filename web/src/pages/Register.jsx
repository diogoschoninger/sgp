import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated, setToken } from '../services/auth'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import { validate as emailValidator } from 'react-email-validator'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCPF] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [formError, setFormError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const register = async event => {
    event.preventDefault()

    // Verifica se o email é válido
    if (!emailValidator(email)) {
      return setFormError('Email inválido.')
    } else setFormError(null)

    // Verifica se o CPF é válido
    if (!cpfValidator.isValid(cpf)) {
      return setFormError('CPF inválido.')
    } else setFormError(null)

    // Verifica se as senhas são iguais
    if (password !== password2) {
      return setFormError('As senhas não conferem.')
    } else setFormError(null)

    await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        cpf,
        password
      })
    })
      .then(result => result.json())
      .then(result => {
        if (result.error) {
          return setFormError(result.message)
        }

        setRegisterSuccess(true)
      })
  }

  return (
    <div>
      {isAuthenticated() && <Navigate to="/" />}
      {registerSuccess && <Navigate to="/" />}

      <form onSubmit={register}>
        <div>
          <label htmlFor="name">Nome completo</label>
          <input id="name" type="text" minLength={2} onChange={e => setName(e.target.value)} required></input>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" onChange={e => setEmail(e.target.value)} required></input>
        </div>

        <div>
          <label htmlFor="cpf">CPF</label>
          <input id="cpf" type="text" minLength={11} maxLength={11} onChange={e => setCPF(e.target.value)} required></input>
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" onChange={e => setPassword(e.target.value)} required></input>
        </div>

        <div>
          <label htmlFor="password2">Confirme sua senha</label>
          <input id="password2" type="password" onChange={e => setPassword2(e.target.value)} required></input>
        </div>

        {formError && <p style={{ color: '#f00' }}>{formError}</p>}

        <input type="submit" value="Cadastrar" />
      </form>
    </div>
  )
}

export default Register
