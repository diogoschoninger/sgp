import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/auth'

const Dashboard = () => {
  return (
    <div>
      {!isAuthenticated() && <Navigate to="/login" />}
    </div>
  )
}

export default Dashboard
