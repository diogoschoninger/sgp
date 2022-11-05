import { useEffect, useState } from "react"
import { isAuthenticated, setToken } from "../services/auth"
import { redirect } from 'react-router-dom'

const Login = () => {
  if (isAuthenticated()) {
    return redirect('/')
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async (e) => {
    e.preventDefault()

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
        if (result.error) {
          return console.warn(result.message)
        }

        setToken(result.token)

        redirect('/')
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <form onSubmit={login}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" onChange={e => setEmail(e.target.value)}></input>
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" onChange={e => setPassword(e.target.value)}></input>
        </div>

        <input type="submit" value="Acessar" />
      </form>
    </div>
  )
}

export default Login
