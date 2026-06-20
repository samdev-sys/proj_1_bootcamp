import { useState } from 'react'
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
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    const campos = ['nombre', 'usuario', 'email', 'password', 'pregunta', 'respuesta']
    const incompletos = campos.filter((campo) => !form[campo].trim())

    if (incompletos.length > 0) {
      setMessage({ type: 'error', text: 'Completa todos los campos' })
      return
    }

    setLoading(true)
    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => formData.append(key, value))
    if (foto) formData.append('foto', foto)

    try {
      const data = await registerUser(formData)
      setMessage({ type: 'success', text: data.message })
      setForm({ nombre: '', usuario: '', email: '', password: '', pregunta: '', respuesta: '' })
      setFoto(null)
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Error en el registro' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-300">
      {/* Hero */}
      <div className="relative h-[300px] overflow-hidden">
        <img src="/3222.png" alt="hero" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">AUMENTO DE PRODUCTIVIDAD AL 80%</h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto px-4 py-8 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-teal-800 mb-6">REGISTRAR USUARIO</h2>

          {message.text && (
            <div className={`p-3 rounded-lg mb-4 ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-teal-700 font-mono text-sm mb-1">Nombres</label>
              <input type="text" name="nombre" required value={form.nombre} onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500" />
            </div>

            <div>
              <label className="block text-teal-700 font-mono text-sm mb-1">Sube tu foto</label>
              <input type="file" name="foto" accept="image/*" onChange={(e) => setFoto(e.target.files[0])}
                className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-teal-500 file:text-white" />
            </div>

            <div>
              <label className="block text-teal-700 font-mono text-sm mb-1">Usuario</label>
              <input type="text" name="usuario" required value={form.usuario} onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500" />
            </div>

            <div>
              <label className="block text-teal-700 font-mono text-sm mb-1">Email</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500" />
            </div>

            <div>
              <label className="block text-teal-700 font-mono text-sm mb-1">Contraseña</label>
              <input type="password" name="password" required value={form.password} onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500" />
              <a href="https://passgen-pz90.onrender.com" target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline text-sm mt-1 inline-block">
                ¿Prefieres usar el generador visual?
              </a>
            </div>

            <div>
              <label className="block text-teal-700 font-mono text-sm mb-1">Pregunta de seguridad</label>
              <select name="pregunta" required value={form.pregunta} onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white">
                <option value="" disabled>Seleccione una pregunta</option>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white py-3 rounded-lg font-bold transition"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Registrando...
                </span>
              ) : 'Registrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
