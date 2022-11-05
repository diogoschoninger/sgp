import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Páginas
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

const routes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)

export default routes
