import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const modalRef = useRef(null)

  const openModal = () => modalRef.current?.showModal()
  const closeModal = () => modalRef.current?.close()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-cyan-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/tasks" className="text-xl font-bold tracking-wide">
            taskFlow
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/urls" className="hover:bg-cyan-600 p-2 rounded-lg transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Link>
            <button onClick={openModal} className="hover:bg-cyan-600 p-2 rounded-lg transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <dialog ref={modalRef} className="rounded-2xl shadow-2xl border-0 p-0 w-full max-w-md backdrop:bg-black/50">
        <div className="bg-cyan-800 text-white p-6 rounded-t-2xl">
          <h3 className="text-xl font-bold">¿Seguro que deseas cerrar sesión?</h3>
          <p className="text-cyan-200 mt-2">Tendrás que volver a ingresar tus credenciales.</p>
        </div>
        <div className="bg-cyan-800 p-4 rounded-b-2xl flex justify-end gap-3">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg transition text-white">
            Cancelar
          </button>
          <button onClick={handleLogout} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition text-white">
            Sí, cerrar sesión
          </button>
        </div>
      </dialog>

      <main>{children}</main>
    </div>
  )
}
