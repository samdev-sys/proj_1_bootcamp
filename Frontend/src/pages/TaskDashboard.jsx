import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { getTasks, createTask, updateTask, deleteTask, getUrls, saveUrl, deleteUrl } from '../services/api'

export default function TaskDashboard() {
  const { userId, username } = useAuth()
  const [tasks, setTasks] = useState([])
  const [urls, setUrls] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [taskForm, setTaskForm] = useState({
    asunto: '',
    descripcion: '',
    store_URL: '',
    Estado: 'por_iniciar',
  })
  const [urlInput, setUrlInput] = useState('')

  const loadTasks = useCallback(async () => {
    if (!userId) return
    try {
      const data = await getTasks(userId)
      setTasks(data)
    } catch (err) {
      console.error('Error al cargar tareas:', err.message)
    }
  }, [userId])

  const loadUrls = useCallback(async () => {
    if (!userId) return
    try {
      const data = await getUrls(userId)
      setUrls(data)
    } catch (err) {
      console.error('Error al cargar URLs:', err.message)
    }
  }, [userId])

  useEffect(() => {
    loadTasks()
    loadUrls()
  }, [loadTasks, loadUrls])

  useEffect(() => {
    const modalElems = document.querySelectorAll('.modal')
    const collapsibleElems = document.querySelectorAll('.collapsible')
    window.M?.Modal.init(modalElems)
    window.M?.Collapsible.init(collapsibleElems)
  }, [tasks])

  const handleTaskChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value })
  }

  const handleTaskSubmit = async (e) => {
    e.preventDefault()
    if (!username) {
      window.M?.toast({ html: 'Usuario no identificado', classes: 'red' })
      return
    }

    const payload = {
      user: username,
      user_id: userId,
      asunto: taskForm.asunto.trim(),
      descripcion: taskForm.descripcion.trim(),
      store_URL: taskForm.store_URL.trim(),
      tipo_archivo: '',
      fecha_de_creacion: new Date().toISOString().slice(0, 19).replace('T', ' '),
      Estado: taskForm.Estado,
    }

    try {
      if (editingId) {
        await updateTask(editingId, payload)
        window.M?.toast({ html: 'Tarea actualizada con éxito', classes: 'green' })
      } else {
        await createTask(payload)
        window.M?.toast({ html: 'Tarea creada con éxito', classes: 'green' })
      }
      setTaskForm({ asunto: '', descripcion: '', store_URL: '', Estado: 'por_iniciar' })
      setEditingId(null)
      const modal = window.M?.Modal.getInstance(document.getElementById('taskModal'))
      modal?.close()
      loadTasks()
    } catch (err) {
      window.M?.toast({ html: 'No se pudo guardar la tarea', classes: 'red' })
    }
  }

  const handleEditTask = async (id) => {
    try {
      const tarea = await getTask(id)
      setTaskForm({
        asunto: tarea.asunto,
        descripcion: tarea.descripcion,
        store_URL: '',
        Estado: tarea.Estado,
      })
      setEditingId(id)
      const modal = window.M?.Modal.getInstance(document.getElementById('taskModal'))
      modal?.open()
    } catch (err) {
      console.error('Error al traer la tarea:', err.message)
    }
  }

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Confirmas para eliminar?')) return
    try {
      await deleteTask(id)
      window.M?.toast({ html: 'Tarea eliminada', classes: 'green' })
      loadTasks()
    } catch (err) {
      window.M?.toast({ html: 'No se pudo eliminar la tarea', classes: 'red' })
    }
  }

  const handleSaveUrl = async () => {
    if (!urlInput.trim() || !/^https?:\/\/.+/i.test(urlInput)) {
      window.M?.toast({ html: 'Introduce una URL válida (http:// o https://)', classes: 'orange' })
      return
    }
    try {
      await saveUrl(userId, urlInput.trim())
      setUrlInput('')
      loadUrls()
      window.M?.toast({ html: 'URL guardada con éxito', classes: 'green' })
    } catch (err) {
      window.M?.toast({ html: err.message || 'No se pudo guardar la URL', classes: 'red' })
    }
  }

  const handleDeleteUrl = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar?')) return
    try {
      await deleteUrl(id)
      loadUrls()
      window.M?.toast({ html: 'URL eliminada con éxito', classes: 'green' })
    } catch (err) {
      window.M?.toast({ html: 'No se pudo eliminar la URL', classes: 'red' })
    }
  }

  const getTasksByStatus = (status) => {
    return tasks.filter((t) => {
      const estado = t.Estado?.toLowerCase() || 'pendiente'
      if (status === 'en_proceso') return ['en proceso', 'en_proceso'].includes(estado)
      if (status === 'pendiente') return ['pendiente', 'por_iniciar'].includes(estado)
      if (status === 'finalizado') return estado === 'finalizado'
      return false
    })
  }

  const renderTaskCard = (task) => (
    <div key={task.id_tarea} className="card-panel teal lighten-5 black-text task-card">
      <strong>{task.asunto}</strong><br />
      <span>{task.descripcion}</span><br />
      <div style={{ marginTop: '8px' }}>
        <button
          className="btn-small yellow black-text"
          onClick={() => handleEditTask(task.id_tarea)}
        >
          <i className="material-icons">edit</i>
        </button>
        <button
          className="btn-small red darken-1 white-text"
          onClick={() => handleDeleteTask(task.id_tarea)}
          style={{ marginLeft: '8px' }}
        >
          <i className="material-icons">delete</i>
        </button>
      </div>
    </div>
  )

  return (
    <div className="tasks-bg">
      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '8px', padding: '0 16px' }}>
        <a
          className="btn cyan darken-1 modal-trigger"
          style={{ borderRadius: '8px' }}
          href="#urlModal"
        >
          Gestionar URLs
        </a>

        <div id="urlModal" className="modal">
          <div className="modal-content">
            <h4>Introduce URLs para acceso rápido</h4>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="url"
                placeholder="https://..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                style={{ flex: 1 }}
              />
              <button className="btn blue" onClick={handleSaveUrl}>Guardar URL</button>
            </div>

            <h4>Enlaces guardados</h4>
            <div className="row">
              {urls.length === 0 ? (
                <p className="red-text">No hay URLs guardadas.</p>
              ) : (
                urls.map(({ id, url }) => (
                  <div key={id} className="col s12 m6 l4">
                    <div className="card blue-grey darken-1 white-text hoverable">
                      <div className="card-content">
                        <span className="card-title">
                          <i className="material-icons left">link</i>URL
                        </span>
                        <p style={{ wordWrap: 'break-word' }}>
                          <a href={url} target="_blank" rel="noreferrer" className="yellow-text text-lighten-3">
                            {url}
                          </a>
                        </p>
                      </div>
                      <div className="card-action">
                        <button className="btn red" onClick={() => handleDeleteUrl(id)}>
                          <i className="material-icons">delete</i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <a
          className="waves-effect waves-light btn modal-trigger blue darken-4"
          style={{ borderRadius: '8px' }}
          href="#taskModal"
        >
          AGREGAR TAREA
        </a>
      </div>

      <div id="taskModal" className="modal">
        <div className="modal-content" style={{ borderRadius: '8px' }}>
          <h1>{editingId ? 'EDITAR TAREA' : 'AGREGAR TAREA'}</h1>
          <form onSubmit={handleTaskSubmit}>
            <label htmlFor="asunto" className="txt">Asunto</label>
            <input
              type="text"
              id="asunto"
              name="asunto"
              required
              value={taskForm.asunto}
              onChange={handleTaskChange}
            />

            <label htmlFor="store_URL" style={{ color: 'rgb(36, 147, 147)', fontFamily: 'Roboto Mono, monospace' }}>
              Adjuntar URLs
            </label>
            <input
              type="url"
              id="store_URL"
              name="store_URL"
              value={taskForm.store_URL}
              onChange={handleTaskChange}
            />

            <label htmlFor="descripcion" className="txt">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={taskForm.descripcion}
              onChange={handleTaskChange}
            />

            <p>
              <label>
                <input
                  name="Estado"
                  type="radio"
                  value="por_iniciar"
                  checked={taskForm.Estado === 'por_iniciar'}
                  onChange={handleTaskChange}
                />
                <span>Pendientes</span>
              </label>
              <label>
                <input
                  name="Estado"
                  type="radio"
                  value="en_proceso"
                  checked={taskForm.Estado === 'en_proceso'}
                  onChange={handleTaskChange}
                />
                <span>En proceso</span>
              </label>
              <label>
                <input
                  name="Estado"
                  type="radio"
                  value="finalizado"
                  checked={taskForm.Estado === 'finalizado'}
                  onChange={handleTaskChange}
                />
                <span>Finalizado</span>
              </label>
            </p>

            <div className="modal-footer">
              <button type="submit" className="btn blue darken-4" style={{ borderRadius: '4px' }}>
                {editingId ? 'Actualizar' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <br />
      <h2 className="txt" style={{ padding: '0 16px' }}>Actividades</h2>
      <div style={{ padding: '0 16px' }}>
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              <i className="material-icons cyan-text">hourglass_empty</i>En proceso
            </div>
            <div className="collapsible-body">
              {getTasksByStatus('en_proceso').map(renderTaskCard)}
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons red-text">hourglass_full</i>Pendientes
            </div>
            <div className="collapsible-body">
              {getTasksByStatus('pendiente').map(renderTaskCard)}
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons teal-text">check</i>Finalizado
            </div>
            <div className="collapsible-body">
              {getTasksByStatus('finalizado').map(renderTaskCard)}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
