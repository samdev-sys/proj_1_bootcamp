import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginUser } from '../services/api'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const sliderElems = document.querySelectorAll('.slider')
    const modalElems = document.querySelectorAll('.modal')
    window.M?.Slider.init(sliderElems, { indicators: true, height: 400, interval: 5000 })
    window.M?.Modal.init(modalElems)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      window.M?.toast({ html: 'Completa todos los campos', classes: 'orange' })
      return
    }

    setLoading(true)
    try {
      const result = await loginUser(username.trim(), password.trim())
      if (result.success) {
        login(result.user.id, username.trim())
        window.M?.toast({ html: 'Inicio de sesión exitoso', classes: 'green' })
        navigate('/tasks')
      } else {
        window.M?.toast({ html: result.message, classes: 'red' })
      }
    } catch (err) {
      window.M?.toast({ html: 'Error al iniciar sesión', classes: 'red' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="landing-bg">
      <header>
        <nav className="blue darken-1">
          <div className="nav-wrapper" style={{ paddingLeft: '16px' }}>
            <a
              className="waves-effect waves-light btn modal-trigger indigo darken-2"
              href="#loginModal"
            >
              Iniciar
            </a>

            <div id="loginModal" className="modal" style={{ backgroundColor: 'rgb(7, 51, 51)', border: '2px solid azure', borderRadius: '8px' }}>
              <div className="modal-content">
                <div className="container">
                  <form className="col s12" onSubmit={handleSubmit}>
                    <div className="form">
                      <div className="row">
                        <h1>Iniciar Sesión</h1>
                        <div className="input-field col s6">
                          <input
                            placeholder="Usuario"
                            id="usernameLog"
                            type="text"
                            className="validate"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <label htmlFor="usernameLog">Usuario</label>
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-field col s12">
                          <input
                            id="passwordLog"
                            type="password"
                            className="validate"
                            placeholder="Contraseña"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label htmlFor="passwordLog">Contraseña</label>
                        </div>
                      </div>

                      <div>
                        <Link to="/recuperar">¿Ha olvidado su contraseña?</Link>
                      </div>

                      <button
                        className="btn waves-effect waves-light blue darken-1"
                        type="submit"
                        style={{ borderRadius: '8px' }}
                        disabled={loading}
                      >
                        {loading ? 'Ingresando...' : 'Iniciar'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="slider">
        <ul className="slides">
          <li>
            <img src="/55448.png" alt="slide1" />
            <div className="caption center-align">
              <h3><p>LA OPTIMIZACION A SUS PROYECTOS A LLEGADO</p></h3>
              <h5 className="light grey-text text-lighten-3">con taskFlow</h5>
            </div>
          </li>
          <li>
            <img src="/ChatGPT Image 22 may 2025, 08_29_43 p.m._texto.png .png" alt="slide2" />
            <div className="caption left-align"></div>
          </li>
          <li>
            <img src="/WhatsApp Image 2025-05-08 at 6.23.45 PM (2).jpeg" alt="slide3" />
            <div className="caption right-align">
              <h3><p>Obtenga una cuenta gratis para comprobar la potencia de taskFlow</p></h3>
              <h5 className="light grey-text text-lighten-3">
                <Link to="/register" style={{ color: 'azure', fontFamily: 'roboto' }}>
                  Haga clic en este enlace
                </Link>
              </h5>
            </div>
          </li>
        </ul>
      </div>

      <main className="principal">
        <div className="container">
          <div className="row">
            <div className="col s12 m8">
              <div className="card-panel teal">
                <span className="white-text">
                  Con taskFlow sus proyectos y tareas tendran una eficiencia del 70%, gracias a la integracion de herramientas de IA y python. Compruebelo!!
                </span>
                <Link to="/register" className="btn waves-effect waves-light" style={{ color: 'aliceblue', marginLeft: '16px' }}>
                  REGISTRARSE
                  <i className="material-icons right">input</i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        © 2025 Designed by : Onix.dev
        <br />
        <Link to="/contacto">contactenos!!</Link>
      </footer>
    </div>
  )
}
