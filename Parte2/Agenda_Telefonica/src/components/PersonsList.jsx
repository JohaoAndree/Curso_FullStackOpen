import Person from './Person'

const PersonsList = ({ persons, searchItem, onDelete }) => {
  const filterDinamic = () => {
    if (searchItem === '') {
      return persons
    }
    return persons.filter(person =>
      person.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      person.number.includes(searchItem)
    )
  }

  const filteredPersons = filterDinamic()

  if (filteredPersons.length === 0) {
    return <p>No hay contactos disponibles</p>
  }

  return (
    <ul>
      {filteredPersons.map(person => (
        <Person 
          key={person.id} 
          person={person} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  )
}

export default PersonsList
