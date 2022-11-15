import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCPF] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [formError, setFormError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const register = async event => {
    // Previne o recarregamento da página quando o formulário é submetido
    event.preventDefault()

    // Verifica se o CPF é válido
    if (!cpfValidator.isValid(cpf)) {
      return setFormError('CPF inválido.')
    }

    // Verifica se as senhas são iguais
    if (password !== password2) {
      return setFormError('As senhas não conferem.')
    }

    setFormError(null)

    // Executa a requisição de cadastro ao servidor
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
        // Retorna o erro obtido do servidor, caso houver
        if (result.errors) {
          if (result.name === "SequelizeUniqueConstraintError") {
            return setFormError(`Este ${result.errors[0].path} já está sendo utilizado por outro usuário`)
          } else {
            return setFormError('Ocorreu um erro ao realizar o cadastro. Atualize a página e tente novamente')
          }
        }

        // Armazena o sucesso do cadastro para uso posterior em feedback ao usuário
        setRegisterSuccess(true)
      })
      .catch(() => {
        // Retorna um alerta de erro desconhecido
        return setFormError('Ocorreu um erro ao realizar o cadastro. Atualize a página e tente novamente')
      })
  }

  return (
    <div>
      <h1>Cadastro de usuário</h1>

      <form onSubmit={register}>
        <div>
          <label htmlFor="name">Nome completo</label>
          <input id="name" type="text" minLength={2} onChange={e => setName(e.target.value)} required></input>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" onChange={e => setEmail(e.target.value)} required></input>
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

        <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
      </form>

      {registerSuccess && <p style={{ color: '#0a0' }}>Usuário cadastrado com sucesso. <Link to="/login">Faça login</Link></p>}
    </div>
  )
}

export default Register
