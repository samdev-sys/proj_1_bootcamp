import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { recuperarPassword } from '../services/api'

export default function RecuperaPassword() {
  const [form, setForm] = useState({ usuario: '', email: '', pregunta: '', respuesta: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const selectElems = document.querySelectorAll('select')
    window.M?.FormSelect.init(selectElems)
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = await recuperarPassword(form.email, form.usuario)
      window.M?.toast({ html: data.message, classes: 'green' })
      setTimeout(() => navigate('/'), 3000)
    } catch (err) {
      window.M?.toast({ html: err.message || 'Error al recuperar contraseña', classes: 'red' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="recover-bg">
      <div className="container" style={{ maxWidth: '900px', margin: 'auto', padding: '40px', background: 'rgba(255,255,255,0.8)', borderRadius: '10px', boxShadow: '0px 10px 10px rgba(0,0,0,0.1)' }}>
        <h1>Recuperar Contraseña</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user" className="txt">Ingrese su nombre de Usuario</label>
          <input type="text" id="user" name="usuario" required value={form.usuario} onChange={handleChange} />

          <label htmlFor="email" className="txt">Ingrese su Email para enviar el enlace de recuperación</label>
          <input type="email" id="email" name="email" required value={form.email} onChange={handleChange} />

          <div className="input-field">
            <select name="pregunta" value={form.pregunta} onChange={handleChange} className="browser-default">
              <option value="" disabled selected>Seleccione su pregunta de seguridad</option>
              <option value="madre">¿Nombre de tu madre?</option>
              <option value="mascota">¿Nombre de tu primera mascota?</option>
              <option value="escuela">¿Nombre de tu escuela primaria?</option>
              <option value="ciudad">¿En qué ciudad naciste?</option>
            </select>
          </div>

          <label htmlFor="respuesta" className="txt">Respuesta</label>
          <input type="text" id="respuesta" name="respuesta" required value={form.respuesta} onChange={handleChange} />

          <button type="submit" className="btn waves-effect waves-light" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  )
}
