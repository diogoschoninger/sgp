import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/auth'

const Dashboard = () => {
  return (
    <div>
      {/* Redireciona um usuário não autenticado à página de login */}
      {!isAuthenticated() && <Navigate to="/login" />}

      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
