import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

// Obtener todos los países
const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

// Buscar país por nombre
const getByName = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`)
  return request.then(response => response.data)
}

// Obtener información del clima
const getWeather = (lat, lon) => {
  const request = axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
  return request.then(response => response.data)
}

export default { getAll, getByName, getWeather }
