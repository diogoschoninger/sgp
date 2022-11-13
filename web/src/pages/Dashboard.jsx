import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getLoggedUserToken, getLoggedUserId, setLogout } from '../services/auth'

const Dashboard = () => {
  const [loggedUser, setLoggedUser] = useState(false)
  const [finOperations, setFinOperations] = useState(false)

  const getLoggedUser = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/users/${getLoggedUserId()}`, {
      headers: {
        'authorization-token': getLoggedUserToken(),
        'authorization-id': getLoggedUserId()
      }
    })
      .then(result => result.json())
      .then(result => {
        if (result.invalidToken) setLogout()
        setLoggedUser(result.user)
      })
      .catch(() => {
        setLogout()
      })
  }

  const getFinOperations = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/users/${getLoggedUserId()}/fin-operations`, {
      headers: {
        'authorization-token': getLoggedUserToken(),
        'authorization-id': getLoggedUserId()
      }
    })
      .then(result => result.json())
      .then(result => {
        if (result.invalidToken) setLogout()
        setFinOperations(result.fin_operations)
      })
      .catch(() => {
        setLogout()
      })
  }

  useEffect(() => {
    getLoggedUser()
    getFinOperations()
  }, [])

  return (
    <div>
      {(!getLoggedUserToken() || !getLoggedUserId()) && <Navigate to="/login" />}

      <h1>Dashboard</h1>

      {loggedUser &&
        <p>Usuário logado no momento: {loggedUser.name}</p>
      }

      {finOperations &&
        <div>
          <h2>Operações financeiras</h2>

          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Lado</th>
                <th>Forma de pagamento</th>
              </tr>
            </thead>

            <tbody>
              {Object.values(finOperations).map(op => (
                <tr key={op.id}>
                  <td>{op.date}</td>
                  <td>{op.description}</td>
                  <td>{op.value}</td>
                  <td>{op.category}</td>
                  <td>{op.side}</td>
                  <td>{op.payment_method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }

      <button onClick={setLogout}>Sair</button>
    </div>
  )
}

export default Dashboard
