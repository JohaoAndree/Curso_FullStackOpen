const Person = ({ person, onDelete }) => {
  return (
    <div>
      <li className="person-item">
        {person.name}: {person.number} 
        <button className="delete-button" onClick={() => onDelete(person.id)}>
          Eliminar
        </button>
      </li>
    </div>
  )
}

export default Person