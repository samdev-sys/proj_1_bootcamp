import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(() => {
    const stored = localStorage.getItem('userId')
    return stored && !isNaN(parseInt(stored)) ? parseInt(stored) : null
  })

  const [username, setUsername] = useState(() => localStorage.getItem('username') || '')

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId)
    } else {
      localStorage.removeItem('userId')
    }
  }, [userId])

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username)
    } else {
      localStorage.removeItem('username')
    }
  }, [username])

  const login = (id, user) => {
    setUserId(id)
    setUsername(user)
  }

  const logout = () => {
    setUserId(null)
    setUsername('')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
  }

  return (
    <AuthContext.Provider value={{ userId, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
