import { useState, useEffect } from 'react'
import Subtittles from './components/Subtittles'
import FilterBox from './components/FilterBox'
import FormData from './components/FormData'
import PersonsList from './components/PersonsList'
import NotificationComponent from './components/Notification'
import personService from './services/personService'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchItem, setSearchItem] = useState('')
  const [notification, setNotification] = useState(null)

  // Función helper para mostrar notificaciones
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, type === 'error' ? 5000 : 3000)
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
        showNotification("Datos cargados correctamente")
      })
  }, [])

  const addData = (event) => {
    event.preventDefault()
    
    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} ya se encuentra en la agenda telefónica. ¿Deseas actualizar su número?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        const updatedPerson = { ...personToUpdate, number: newNumber }
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Número de ${newName} actualizado correctamente.`)
          })
          .catch(() => {
            showNotification(`La información de ${newName} ya no se encuentra en el servidor.`, 'error')
          })
      }
      return  // Sale de la función - no crear nueva persona
    }
    
    const personObject = {
      name: newName,
      number: newNumber,
      // No incluir id - JSON Server lo genera automáticamente
    }
    
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Contacto ${newName} con número ${newNumber} creado correctamente`)
      })
      .catch(() => {
        showNotification('Ocurrió un error al intentar crear el contacto.', 'error')
      })
  }

  const deleteData = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este contacto?')) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification('Contacto eliminado correctamente')
        })
        .catch(() => {
          showNotification('Ocurrió un error al intentar eliminar al contacto.', 'error')
        })
    }
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
    <div className="app-container">
      <h1>Agenda telefónica</h1>
      <NotificationComponent notification={notification} />
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
      <PersonsList 
        persons={persons} 
        searchItem={searchItem} 
        onDelete={deleteData} 
      />
    </div>
  )
}

export default App