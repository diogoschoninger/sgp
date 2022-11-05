import { isAuthenticated } from '../services/auth'
import { redirect } from 'react-router-dom'

const Dashboard = () => {
  if (!isAuthenticated()) {
    redirect('/login')
    return
  }

  return <h1>Dashboard</h1>
}

export default Dashboard
