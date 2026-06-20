import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { recuperarPassword } from '../services/api'

export default function RecuperaPassword() {
  const [form, setForm] = useState({ usuario: '', email: '', pregunta: '', respuesta: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const data = await recuperarPassword(form.email, form.usuario)
      setMessage({ type: 'success', text: data.message })
      setTimeout(() => navigate('/'), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Error al recuperar contraseña' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-teal-800 to-cyan-900 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-teal-800 mb-6">Recuperar Contraseña</h1>

        {message.text && (
          <div className={`p-3 rounded-lg mb-4 ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-teal-700 font-mono text-sm mb-1">Nombre de Usuario</label>
            <input type="text" name="usuario" required value={form.usuario} onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500" />
          </div>

          <div>
            <label className="block text-teal-700 font-mono text-sm mb-1">Email</label>
            <input type="email" name="email" required value={form.email} onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500" />
          </div>

          <div>
            <label className="block text-teal-700 font-mono text-sm mb-1">Pregunta de seguridad</label>
            <select name="pregunta" value={form.pregunta} onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white">
              <option value="" disabled>Seleccione su pregunta</option>
              <option value="madre">¿Nombre de tu madre?</option>
              <option value="mascota">¿Nombre de tu primera mascota?</option>
              <option value="escuela">¿Nombre de tu escuela primaria?</option>
              <option value="ciudad">¿En qué ciudad naciste?</option>
            </select>
          </div>

          <div>
            <label className="block text-teal-700 font-mono text-sm mb-1">Respuesta</label>
            <input type="text" name="respuesta" required value={form.respuesta} onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-800 text-white py-3 rounded-lg font-bold transition">
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  )
}
