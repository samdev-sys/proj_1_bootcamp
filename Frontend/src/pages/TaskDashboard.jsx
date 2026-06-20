import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { getTasks, createTask, updateTask, deleteTask, getUrls, saveUrl, deleteUrl } from '../services/api'

export default function TaskDashboard() {
  const { userId, username } = useAuth()
  const [tasks, setTasks] = useState([])
  const [urls, setUrls] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [taskForm, setTaskForm] = useState({ asunto: '', descripcion: '', store_URL: '', Estado: 'por_iniciar' })
  const [urlInput, setUrlInput] = useState('')
  const [toast, setToast] = useState({ show: false, message: '', type: '' })
  const taskModalRef = useRef(null)
  const urlModalRef = useRef(null)

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000)
  }

  const loadTasks = useCallback(async () => {
    if (!userId) return
    try { setTasks(await getTasks(userId)) } catch (err) { console.error(err) }
  }, [userId])

  const loadUrls = useCallback(async () => {
    if (!userId) return
    try { setUrls(await getUrls(userId)) } catch (err) { console.error(err) }
  }, [userId])

  useEffect(() => { loadTasks(); loadUrls() }, [loadTasks, loadUrls])

  const handleTaskSubmit = async (e) => {
    e.preventDefault()
    if (!username) { showToast('Usuario no identificado', 'error'); return }

    const payload = {
      user: username, user_id: userId,
      asunto: taskForm.asunto.trim(), descripcion: taskForm.descripcion.trim(),
      store_URL: taskForm.store_URL.trim(), tipo_archivo: '',
      fecha_de_creacion: new Date().toISOString().slice(0, 19).replace('T', ' '),
      Estado: taskForm.Estado,
    }

    try {
      if (editingId) { await updateTask(editingId, payload); showToast('Tarea actualizada') }
      else { await createTask(payload); showToast('Tarea creada') }
      setTaskForm({ asunto: '', descripcion: '', store_URL: '', Estado: 'por_iniciar' })
      setEditingId(null)
      taskModalRef.current?.close()
      loadTasks()
    } catch (err) { showToast('No se pudo guardar la tarea', 'error') }
  }

  const handleEditTask = async (id) => {
    try {
      const tarea = await getTask(id)
      setTaskForm({ asunto: tarea.asunto, descripcion: tarea.descripcion, store_URL: '', Estado: tarea.Estado })
      setEditingId(id)
      taskModalRef.current?.showModal()
    } catch (err) { console.error(err) }
  }

  const handleDeleteTask = async (id) => {
    if (!window.confirm('¿Confirmas para eliminar?')) return
    try { await deleteTask(id); showToast('Tarea eliminada'); loadTasks() }
    catch (err) { showToast('No se pudo eliminar', 'error') }
  }

  const handleSaveUrl = async () => {
    if (!urlInput.trim() || !/^https?:\/\/.+/i.test(urlInput)) { showToast('URL inválida', 'error'); return }
    try { await saveUrl(userId, urlInput.trim()); setUrlInput(''); loadUrls(); showToast('URL guardada') }
    catch (err) { showToast(err.message || 'Error al guardar', 'error') }
  }

  const handleDeleteUrl = async (id) => {
    if (!window.confirm('¿Eliminar URL?')) return
    try { await deleteUrl(id); loadUrls(); showToast('URL eliminada') }
    catch (err) { showToast('No se pudo eliminar', 'error') }
  }

  const getTasksByStatus = (status) => tasks.filter((t) => {
    const estado = t.Estado?.toLowerCase() || 'pendiente'
    if (status === 'en_proceso') return ['en proceso', 'en_proceso'].includes(estado)
    if (status === 'pendiente') return ['pendiente', 'por_iniciar'].includes(estado)
    if (status === 'finalizado') return estado === 'finalizado'
    return false
  })

  const TaskCard = ({ task }) => (
    <div className="bg-white border-l-4 border-cyan-500 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition">
      <h4 className="font-bold text-gray-800">{task.asunto}</h4>
      <p className="text-gray-600 text-sm mt-1">{task.descripcion}</p>
      <div className="flex gap-2 mt-3">
        <button onClick={() => handleEditTask(task.id_tarea)} className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg text-sm font-medium transition">
          Editar
        </button>
        <button onClick={() => handleDeleteTask(task.id_tarea)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition">
          Eliminar
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-cyan-50 p-6">
      {/* Toast */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium transition ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button onClick={() => urlModalRef.current?.showModal()} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition">
          Gestionar URLs
        </button>
        <button onClick={() => { setEditingId(null); setTaskForm({ asunto: '', descripcion: '', store_URL: '', Estado: 'por_iniciar' }); taskModalRef.current?.showModal() }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
          AGREGAR TAREA
        </button>
      </div>

      {/* URL Modal */}
      <dialog ref={urlModalRef} className="rounded-2xl shadow-2xl border-0 p-0 w-full max-w-2xl backdrop:bg-black/50">
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">URLs de acceso rápido</h3>
          <div className="flex gap-2 mb-6">
            <input type="url" placeholder="https://..." value={urlInput} onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500" />
            <button onClick={handleSaveUrl} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">Guardar</button>
          </div>

          <h4 className="font-bold text-gray-700 mb-3">Enlaces guardados</h4>
          {urls.length === 0 ? (
            <p className="text-red-500">No hay URLs guardadas.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {urls.map(({ id, url }) => (
                <div key={id} className="bg-gray-800 text-white rounded-xl p-4 flex items-center justify-between">
                  <a href={url} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline truncate flex-1">{url}</a>
                  <button onClick={() => handleDeleteUrl(id)} className="ml-3 px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-sm">Eliminar</button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button onClick={() => urlModalRef.current?.close()} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition">Cerrar</button>
          </div>
        </div>
      </dialog>

      {/* Task Modal */}
      <dialog ref={taskModalRef} className="rounded-2xl shadow-2xl border-0 p-0 w-full max-w-lg backdrop:bg-black/50">
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{editingId ? 'EDITAR TAREA' : 'AGREGAR TAREA'}</h3>
          <form onSubmit={handleTaskSubmit} className="space-y-4">
            <div>
              <label className="block text-cyan-700 font-mono text-sm mb-1">Asunto</label>
              <input type="text" required value={taskForm.asunto} onChange={(e) => setTaskForm({ ...taskForm, asunto: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-cyan-700 font-mono text-sm mb-1">URL</label>
              <input type="url" value={taskForm.store_URL} onChange={(e) => setTaskForm({ ...taskForm, store_URL: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-cyan-700 font-mono text-sm mb-1">Descripción</label>
              <textarea value={taskForm.descripcion} onChange={(e) => setTaskForm({ ...taskForm, descripcion: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 h-24" />
            </div>
            <div className="flex gap-4">
              {[{ val: 'por_iniciar', label: 'Pendientes' }, { val: 'en_proceso', label: 'En proceso' }, { val: 'finalizado', label: 'Finalizado' }].map(({ val, label }) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="Estado" value={val} checked={taskForm.Estado === val} onChange={(e) => setTaskForm({ ...taskForm, Estado: e.target.value })}
                    className="w-4 h-4 text-cyan-600" />
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => taskModalRef.current?.close()} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition">Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                {editingId ? 'Actualizar' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Tasks */}
      <h2 className="text-2xl font-bold text-teal-700 font-mono mb-4">Actividades</h2>
      <div className="space-y-4">
        {[
          { status: 'en_proceso', label: 'En proceso', icon: '⏳', color: 'border-cyan-400' },
          { status: 'pendiente', label: 'Pendientes', icon: '🔴', color: 'border-red-400' },
          { status: 'finalizado', label: 'Finalizado', icon: '✅', color: 'border-green-400' },
        ].map(({ status, label, icon, color }) => (
          <details key={status} className={`bg-white rounded-xl shadow-sm border-l-4 ${color} overflow-hidden`} open={status === 'en_proceso'}>
            <summary className="px-4 py-3 cursor-pointer font-bold text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
              <span>{icon}</span> {label}
              <span className="ml-auto text-sm text-gray-400">({getTasksByStatus(status).length})</span>
            </summary>
            <div className="px-4 pb-4">
              {getTasksByStatus(status).length === 0 ? (
                <p className="text-gray-400 text-sm">No hay tareas</p>
              ) : (
                getTasksByStatus(status).map((task) => <TaskCard key={task.id_tarea} task={task} />)
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
