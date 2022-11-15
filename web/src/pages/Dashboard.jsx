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
        setLoggedUser(result)
      })
      .catch(() => setLogout())
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
        setFinOperations(result)
      })
      .catch(() => setLogout())
  }

  useEffect(() => {
    getLoggedUser()
    getFinOperations()
  }, [])

  return (
    <div>
      {(!getLoggedUserToken() || !getLoggedUserId()) && <Navigate to="/login" />}

      {loggedUser &&
        <p>Usuário logado no momento: {loggedUser.name} <button onClick={setLogout}>Sair</button></p>
      }

      <h1>Finanças</h1>

      {/* Exibição dos saldos atuais (dados de exemplo) */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div>
          <h3>Saldo atual</h3>
          <span>R$ 1.450,00</span>
        </div>
        <div>
          <h3>Fatura do mês</h3>
          <span>R$ 750,00</span>
        </div>
        <div>
          <h3>Saldo final</h3>
          <span>R$ 700,00</span>
        </div>
      </div>

      {/* Exibição das movimentações do mês atual */}
      <div>
        <h2>Movimentações do mês</h2>

        {!finOperations ? 'Carregando...' :
          finOperations.length < 1 ? 'Não há movimentações para exibir' :
            <div>
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
                      <td>{op.value / 100}</td>
                      <td>{op.category}</td>
                      <td>{op.side}</td>
                      <td>{op.payment_method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        }
      </div>

      {/* Exibição da relação de entradas e saídas mensais */}
      <h2>Relação de entradas e saídas</h2>

      {/* Exibição da variação patrimonial */}
      <h2>Variação patrimonial</h2>
    </div >
  )
}

export default Dashboard
