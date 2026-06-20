import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginUser } from '../services/api'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const modalRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!username.trim() || !password.trim()) {
      setError('Completa todos los campos')
      return
    }

    setLoading(true)
    try {
      const result = await loginUser(username.trim(), password.trim())
      if (result.success) {
        login(result.user.id, username.trim())
        navigate('/tasks')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-cyan-800 to-teal-900">
      {/* Navbar */}
      <nav className="bg-cyan-700/90 backdrop-blur shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center h-16">
          <button
            onClick={() => modalRef.current?.showModal()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Iniciar
          </button>
        </div>
      </nav>

      {/* Login Modal */}
      <dialog ref={modalRef} className="rounded-2xl shadow-2xl border-0 p-0 w-full max-w-md backdrop:bg-black/50">
        <div className="bg-gradient-to-b from-cyan-900 to-teal-900 p-8 rounded-2xl">
          <h2 className="text-3xl font-bold text-white mb-6">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-cyan-200 text-sm mb-1">Usuario</label>
              <input
                type="text"
                placeholder="Usuario"
                className="w-full px-4 py-3 bg-white/10 border border-cyan-400/30 rounded-lg text-white placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-cyan-200 text-sm mb-1">Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-3 bg-white/10 border border-cyan-400/30 rounded-lg text-white placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-900/30 p-2 rounded-lg">{error}</p>
            )}

            <Link to="/recuperar" className="block text-cyan-300 hover:text-cyan-100 text-sm">
              ¿Ha olvidado su contraseña?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? 'Ingresando...' : 'Iniciar'}
            </button>
          </form>

          <button
            onClick={() => modalRef.current?.close()}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>
      </dialog>

      {/* Hero Slider */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/55448.png" alt="hero" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            LA OPTIMIZACIÓN A SUS PROYECTOS HA LLEGADO
          </h1>
          <p className="text-xl text-cyan-200">con taskFlow</p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 shadow-xl">
          <p className="text-white text-lg mb-4">
            Con taskFlow sus proyectos y tareas tendrán una eficiencia del 70%, gracias a la integración de herramientas de IA y Python. ¡Compruebelo!
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            REGISTRARSE
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-teal-800 text-center py-6 text-white font-mono">
        <p>© 2025 Designed by: Onix.dev</p>
        <Link to="/contacto" className="text-cyan-200 hover:text-white underline">
          ¡Contáctenos!
        </Link>
      </footer>
    </div>
  )
}
