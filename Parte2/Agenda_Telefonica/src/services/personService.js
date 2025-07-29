import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

// Obtiene todas las personas del servidor
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Crea una nueva persona en el servidor
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

// Actualiza una persona existente en el servidor
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// Elimina una persona del servidor
const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }