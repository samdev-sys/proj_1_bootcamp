const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  const config = {
    headers: {},
    ...options,
  }

  if (config.body && !(config.body instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json'
    config.body = JSON.stringify(config.body)
  }

  const response = await fetch(url, config)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Error en la solicitud')
  }

  return data
}

// Auth
export async function loginUser(user, password) {
  return request('/login', {
    method: 'POST',
    body: { user, password },
  })
}

// Users
export async function registerUser(formData) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    body: formData,
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Error al registrar')
  return data
}

// Tasks
export async function getTasks(userId) {
  return request(`/tasks/${userId}`)
}

export async function getTask(id) {
  return request(`/tasks/one/${id}`)
}

export async function createTask(taskData) {
  return request('/tasks', {
    method: 'POST',
    body: taskData,
  })
}

export async function updateTask(id, taskData) {
  return request(`/tasks/${id}`, {
    method: 'PUT',
    body: taskData,
  })
}

export async function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: 'DELETE',
  })
}

// URLs
export async function getUrls(userId) {
  return request(`/urls/${userId}`)
}

export async function saveUrl(userId, url) {
  return request('/urls', {
    method: 'POST',
    body: { userId, url },
  })
}

export async function deleteUrl(id) {
  return request(`/urls/${id}`, {
    method: 'DELETE',
  })
}

// Password recovery
export async function recuperarPassword(email, usuario) {
  return request('/recuperar', {
    method: 'POST',
    body: { email, usuario },
  })
}
