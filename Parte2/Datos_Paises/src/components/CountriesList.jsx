import { useState, useEffect } from 'react'
import Country from './Country'
import Title from './Title'
import countriesService from '../services/countriesService'

const CountriesList = ({ countries, searchValue, onShow }) => {
  const [weather, setWeather] = useState(null)

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  )

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      countriesService.getWeather(country.latlng[0], country.latlng[1])
        .then(weatherData => {
          setWeather({
            temperature: weatherData.current_weather.temperature,
            windspeed: weatherData.current_weather.windspeed
          })
        })
        .catch(error => {
          console.error('Error al obtener la información del clima:', error)
          setWeather(null)
        })
    } else {
      setWeather(null)
    }
  }, [filteredCountries])

  if (searchValue === '') {
    return (
      <p>No se ha ingresado ningún país.</p>
    )
  } else if (filteredCountries.length > 10) {
    return (
      <p>Demasiados países encontrados, refine su búsqueda.</p>
    )
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>
        <h2>Lista de coincidencias</h2>
        <ul>
          {filteredCountries.map(country => (
            <Country 
              key={country.name.common}
              country={country}
              onShow={onShow}
            />
          ))}
        </ul>
      </div>
    )
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <div>
        <Title title={country.name.common}/>
        <p>Capital: {country.capital}</p>
        <p>Área: {country.area}</p>
        <Title title={"Idiomas"}/>
        <ul>
          {Object.values(country.languages).map(language => (
            <li className='item-language' key={language}>{language}</li>
          ))}
        </ul>
        <div className='flag-container'>
          <Title title={"Bandera"}/>
          <img src={country.flags.png} alt={`Bandera de ${country.name.common}`} />
        </div>
        <Title title={"Información del clima"}/>
        {weather ? (
          <div>
            <p>Temperatura actual: {weather.temperature}°C</p>
            <p>Velocidad del viento: {weather.windspeed} km/h</p>
          </div>
        ) : (
          <p>Cargando información del clima...</p>
        )}
      </div>
    )
  }
  else {
    return (
      <p>No se encontraron países que coincidan con la búsqueda.</p>
    )
  }
}

export default CountriesList