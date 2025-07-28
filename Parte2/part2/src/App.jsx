import { useState } from 'react'
import Note from './components/Note'

// Componente principal de la aplicación de notas
// Recibe: props.notes (array) - notas iniciales
const App = (props) => {
  // Estados de la aplicación
  const [notes, setNotes] = useState(props.notes)           // Array de todas las notas
  const [newNote, setNewNote] = useState('')               // Contenido de la nueva nota
  const [showAll, setShowAll] = useState(true)             // Filtro: mostrar todas o solo importantes

  // Función para agregar una nueva nota
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,                      // Importancia aleatoria
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))                     // Agrega la nota al estado
    setNewNote('')                                         // Limpia el input
  }

  // Maneja cambios en el input de nueva nota
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  // Filtra qué notas mostrar según el estado showAll
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      {/* Botón para alternar filtro de notas */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      {/* Lista de notas filtradas */}
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      {/* Formulario para agregar nueva nota */}
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 