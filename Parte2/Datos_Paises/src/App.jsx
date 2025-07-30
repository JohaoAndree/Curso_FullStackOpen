import { useState, useEffect } from 'react'
import Title from './components/Title'
import FilterBox from './components/FilterBox'
import countriesService from './services/countriesService'
import CountriesList from './components/CountriesList'
import './index.css'

function App() {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
        console.log('Datos de países cargados correctamente')
      })
      .catch(error => {
        console.error('Error al cargar los datos de países:', error)
      })
  }, [])

  // Controlador para manejar el cambio en el valor de búsqueda
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value)
  }

  // Controlador para mostrar un país específico
  const handleShowCountry = (countryName) => {
    setSearchValue(countryName)
  }

  return (
    <div className="App">
      <Title title = {"Buscador de países"} />
      <FilterBox searchValue={searchValue} onSearchChange={handleSearchValueChange} />
      <CountriesList
        countries={countries}
        searchValue={searchValue}
        onShow={handleShowCountry}
      />
    </div>
  )
}

export default App
