import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import TaskDashboard from './pages/TaskDashboard'
import UrlsPage from './pages/UrlsPage'
import Contacto from './pages/Contacto'
import RecuperaPassword from './pages/RecuperaPassword'

function PrivateRoute({ children }) {
  const { userId } = useAuth()
  return userId ? children : <Navigate to="/" replace />
}

function PublicRoute({ children }) {
  const { userId } = useAuth()
  return !userId ? children : <Navigate to="/tasks" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <PublicRoute>
          <Home />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      <Route path="/recuperar" element={<RecuperaPassword />} />
      <Route path="/tasks" element={
        <PrivateRoute>
          <Layout>
            <TaskDashboard />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/urls" element={
        <PrivateRoute>
          <Layout>
            <UrlsPage />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/contacto" element={
        <Layout>
          <Contacto />
        </Layout>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
