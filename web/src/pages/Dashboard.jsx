import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getLoggedUserToken, getLoggedUserEmail, setLogout } from '../services/auth'

const Dashboard = () => {
  const [user, setUser] = useState(false)

  const getLoggedUser = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/users/${getLoggedUserEmail()}`, {
      headers: {
        'authorization-token': getLoggedUserToken(),
        'authorization-email': getLoggedUserEmail()
      }
    })
      .then(result => result.json())
      .then(result => {
        if (result.invalidToken) {
          setLogout()
        } else {
          setUser(result.user)
        }
      })
      .catch(() => {
        setLogout()
      })
  }

  useEffect(() => {
    getLoggedUser()
  }, [])

  return (
    <div>
      {(!getLoggedUserEmail() || !getLoggedUserToken()) && <Navigate to="/login" />}

      <h1>Dashboard</h1>

      {user &&
        <p>Usuário logado no momento: {user.name}</p>
      }

      <button onClick={setLogout}>Sair</button>
    </div>
  )
}

export default Dashboard
