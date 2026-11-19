import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import FarmerProfile from './pages/FarmerProfile'
import SmartMatch from './pages/SmartMatch'
import SensorMonitor from './pages/SensorMonitor'
import Login from './pages/Login'
import Register from './pages/Register'
import AiAssistant from './pages/AiAssistant'
import ManagementDashboard from './pages/ManagementDashboard'
import FarmerPortal from './pages/FarmerPortal'
import ProtectedRoute from './components/ProtectedRoute'
import { getCurrentUser, logout } from './services/auth'
import './styles.css'

function Nav() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const token = localStorage.getItem('agriflow_token')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        <span>🌾</span>
        <span>AgriFlow</span>
      </Link>

      {token && (
        <>
          <Link to="/">📊 Analytics</Link>
          <Link to="/management">🏢 Management</Link>
          <Link to="/farmer-portal">👨‍🌾 Farmer Portal</Link>
          <Link to="/ai-assistant" style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 6 }}>
            🤖 AI Assistant
          </Link>
          <Link to="/match">💧 Smart Match</Link>
          <Link to="/monitor">📡 Sensors</Link>
        </>
      )}

      {token ? (
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          {user && (
            <span style={{ fontSize: '0.82rem', background: 'rgba(255,255,255,0.18)', padding: '4px 10px', borderRadius: 20 }}>
              {user.role === 'manager' || user.role === 'admin' ? '🏢 Manager: ' : '👨‍🌾 Farmer: '}
              <strong>{user.name || user.email}</strong>
            </span>
          )}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <div style={{ marginLeft: 'auto' }}>
          <Link to="/login" style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 6 }}>
            Login / Register
          </Link>
        </div>
      )}
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Nav />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/management" element={<ProtectedRoute><ManagementDashboard /></ProtectedRoute>} />
            <Route path="/farmer-portal" element={<ProtectedRoute><FarmerPortal /></ProtectedRoute>} />
            <Route path="/ai-assistant" element={<ProtectedRoute><AiAssistant /></ProtectedRoute>} />
            <Route path="/farmer/:id" element={<ProtectedRoute><FarmerProfile /></ProtectedRoute>} />
            <Route path="/match" element={<ProtectedRoute><SmartMatch /></ProtectedRoute>} />
            <Route path="/monitor" element={<ProtectedRoute><SensorMonitor /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
