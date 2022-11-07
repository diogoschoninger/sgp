import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { isAuthenticated, setToken } from '../services/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState(false)
  const [successLogin, setSuccessLogin] = useState(false)

  const login = async (e) => {
    // Previne o recarregamento da página ao submeter o formulário
    e.preventDefault()

    // Executa a requisição de login ao servidor
    await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(result => result.json())
      .then(result => {
        // Retorna o erro obtido do servidor, caso houver
        if (result.error) {
          return setFormError(result.message)
        }

        // Salva o token de auteticação no armazenamento local do navegador
        setToken(result.token)

        // Armazena o sucesso do login para uso posterior em redirecionamento de página
        setSuccessLogin(true)
      })
      .catch(() => (
        // Retorna um alerta de erro desconhecido
        setFormError('Ocorreu um erro ao realizar o acesso. Atualize a página e tente novamente')
      ))
  }

  return (
    <div>
      {/* Redireciona um usuário autenticado à página inicial */}
      {(isAuthenticated() || successLogin) && <Navigate to="/" />}

      <h1>Login</h1>

      <form onSubmit={login}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" onChange={e => setEmail(e.target.value)} required></input>
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" onChange={e => setPassword(e.target.value)} required></input>
        </div>

        {/* Exibe algum erro encontrado durante o processo de login */}
        {formError && <p style={{ color: '#f00' }}>{formError}</p>}

        <input type="submit" value="Acessar" />
      </form>

      <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
    </div>
  )
}

export default Login
