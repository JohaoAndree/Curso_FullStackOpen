import { useState } from 'react'
import Subtittles from './components/Subtittles'
import FilterBox from './components/FilterBox'
import FormData from './components/FormData'
import PersonsList from './components/PersonsList'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchItem, setSearchItem] = useState('')

  const addData = (event) => {
    event.preventDefault()
    
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} ya se encuentra en la agenda`)
      return
    }
    
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchItem(event.target.value)
  }

  return (
    <div>
      <h1>Agenda telefónica</h1>
      <Subtittles subtittle="Filtrar vista de contactos" text="Mostrar solo contactos que coincidan con(nombre o número):" />
      <FilterBox searchValue={searchItem} onSearchChange={handleSearchChange} />
      <Subtittles subtittle="Añadir nuevo contacto" text="Rellena el siguiente formulario:" />
      <FormData
        onSubmit={addData}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <Subtittles subtittle="Contactos" text="Lista de contactos:" />
      <PersonsList persons={persons} searchItem={searchItem} />
    </div>
  )
}

export default App