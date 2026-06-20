import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {
  const { username, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const elems = document.querySelectorAll('.modal')
    window.M?.Modal.init(elems)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <nav>
        <div className="nav-wrapper cyan darken-4">
          <Link to="/tasks" className="brand-logo" style={{ display: 'flex', justifyContent: 'center' }}>
            taskFlow
          </Link>
          <ul id="nav-mobile" style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '16px' }}>
            <li>
              <Link to="/urls">
                <img src="/icons8-menú-cuadrado-96.png" alt="apps" height="65px" />
              </Link>
            </li>
            <li>
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault()
                  const modal = window.M?.Modal.getInstance(document.getElementById('logoutModal'))
                  modal?.open()
                }}
              >
                <img src="/icons8-salida.gif" height="65px" alt="Cerrar sesión" />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div id="logoutModal" className="modal" style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <div className="modal-content" style={{ backgroundColor: '#01579b', paddingBottom: 0 }}>
          <h4 style={{ color: '#fff' }}>¿Seguro que deseas cerrar sesión?</h4>
          <p style={{ fontSize: '18px', color: '#bbdefb' }}>
            Si cierras sesión, tendrás que volver a ingresar tus credenciales.
          </p>
        </div>
        <div className="modal-footer" style={{ backgroundColor: '#01579b' }}>
          <button
            className="btn"
            style={{ backgroundColor: '#006064', marginRight: '10px' }}
            onClick={handleLogout}
          >
            Sí, cerrar sesión
          </button>
          <button
            className="btn grey darken-2"
            onClick={() => {
              const modal = window.M?.Modal.getInstance(document.getElementById('logoutModal'))
              modal?.close()
            }}
          >
            Cancelar
          </button>
        </div>
      </div>

      <main>{children}</main>
    </>
  )
}
