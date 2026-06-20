import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../services/api'

export default function Register() {
  const [form, setForm] = useState({
    nombre: '',
    usuario: '',
    email: '',
    password: '',
    pregunta: '',
    respuesta: '',
  })
  const [foto, setFoto] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const sliderElems = document.querySelectorAll('.slider')
    const selectElems = document.querySelectorAll('select')
    window.M?.Slider.init(sliderElems, { indicators: true, height: 400, interval: 5000 })
    window.M?.FormSelect.init(selectElems)
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFoto(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const campos = ['nombre', 'usuario', 'email', 'password', 'pregunta', 'respuesta']
    const incompletos = campos.filter((campo) => !form[campo].trim())

    if (incompletos.length > 0) {
      window.M?.toast({
        html: '<i class="material-icons left">warning</i> Completa todos los campos',
        classes: 'orange darken-3 white-text rounded',
      })
      return
    }

    setLoading(true)
    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => formData.append(key, value))
    if (foto) formData.append('foto', foto)

    try {
      const data = await registerUser(formData)
      window.M?.toast({
        html: `<i class="material-icons left">check_circle</i> ${data.message}`,
        classes: 'green darken-2 white-text rounded',
      })
      setForm({ nombre: '', usuario: '', email: '', password: '', pregunta: '', respuesta: '' })
      setFoto(null)
    } catch (err) {
      window.M?.toast({
        html: `<i class="material-icons left">error</i> ${err.message || 'Error en el registro'}`,
        classes: 'red darken-2 white-text rounded',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-bg">
      <div className="slider">
        <ul className="slides">
          <li>
            <img src="/3222.png" alt="slide1" />
            <div className="caption center-align">
              <h3>AUMENTO DE PRODUCTIVIDAD AL 80%</h3>
              <h5 className="light grey-text text-lighten-3">taskFlow</h5>
            </div>
          </li>
          <li>
            <img src="/ChatGPT Image 22 may 2025, 08_29_43 p.m._texto.png .png" alt="slide2" />
          </li>
          <li>
            <img src="/WhatsApp Image 2025-05-08 at 6.23.45 PM (2).jpeg" alt="slide3" />
          </li>
        </ul>
      </div>

      <div className="container">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <h1>REGISTRAR USUARIO</h1>

          <label className="txt">Nombres</label>
          <input type="text" name="nombre" required value={form.nombre} onChange={handleChange} />

          <label className="txt">Sube tu foto</label>
          <input type="file" name="foto" onChange={handleFileChange} />
          <br /><br />

          <label className="txt">Usuario</label>
          <input type="text" name="usuario" required value={form.usuario} onChange={handleChange} />

          <label className="txt">Email</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange} />

          <label htmlFor="password" className="txt">Contraseña</label>
          <input type="password" name="password" required value={form.password} onChange={handleChange} />

          <br />
          <a href="https://passgen-pz90.onrender.com" target="_blank" rel="noreferrer">
            ¿Prefieres usar el generador visual?
          </a>

          <div className="input-field">
            <select name="pregunta" required value={form.pregunta} onChange={handleChange}>
              <option value="" disabled selected>Seleccione una pregunta</option>
              <option value="madre">¿Nombre de tu madre?</option>
              <option value="mascota">¿Nombre de tu primera mascota?</option>
              <option value="escuela">¿Nombre de tu escuela primaria?</option>
              <option value="ciudad">¿En qué ciudad naciste?</option>
            </select>
            <label htmlFor="pregunta">Pregunta de seguridad</label>
          </div>

          <label className="txt">Respuesta</label>
          <input type="text" name="respuesta" required value={form.respuesta} onChange={handleChange} />

          <div className="container center-align" style={{ marginTop: '20px' }}>
            <input className="btn green" type="submit" value={loading ? 'Registrando...' : 'Registrar'} disabled={loading} />
          </div>
        </form>
      </div>

      {loading && (
        <div className="center-align">
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left"><div className="circle"></div></div>
              <div className="gap-patch"><div className="circle"></div></div>
              <div className="circle-clipper right"><div className="circle"></div></div>
            </div>
          </div>
          <p className="grey-text">Registrando...</p>
        </div>
      )}
    </div>
  )
}
