import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'           // Servicio para comunicación con el backend

// Componente principal de la aplicación de notas
const App = () => {
  // Estados de la aplicación
  const [notes, setNotes] = useState([])           // Array de todas las notas
  const [newNote, setNewNote] = useState('')       // Contenido de la nueva nota
  const [showAll, setShowAll] = useState(true)     // Filtro: mostrar todas o solo importantes

  // Efecto para cargar notas desde el servidor al iniciar
  useEffect(() => {
    noteService
      .getAll()                                      // Obtiene todas las notas del servidor
      .then(initialNotes => {
        setNotes(initialNotes)                       // Actualiza el estado con las notas recibidas
      })
      .catch(error => {
        console.error('Error al obtener notas:', error)
        // Opcional: setear un estado de error para mostrar al usuario
      })
  }, []) // El array vacío asegura que este efecto solo se ejecute una vez al montar

  // Función para agregar una nueva nota
  const addNote = (event) => {
    event.preventDefault()                           // Previene el comportamiento por defecto del formulario
    const noteObject = {
      content: newNote,                              // Contenido ingresado por el usuario
      important: Math.random() < 0.5,                // Importancia aleatoria (50% de probabilidad)
    }

    noteService
      .create(noteObject)                            // Envía la nueva nota al servidor
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))         // Añade la nueva nota al estado local
        setNewNote('')                               // Limpia el input después de agregar
      })
      .catch(error => {
        console.error('Error al agregar nota:', error)
      })
  }

  // Función para cambiar la importancia de una nota
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)       // Encuentra la nota por ID
    const changedNote = { ...note, important: !note.important }  // Crea copia con importancia invertida
    
    noteService
      .update(id, changedNote)                       // Actualiza la nota en el servidor
      .then(returnedNote => {
        // Actualiza el estado local: reemplaza la nota modificada
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        // Si falla (ej: nota fue eliminada del servidor), informa al usuario
        alert(
          `La nota '${note.content}' fue eliminada del servidor.`
        )
        // Remueve la nota del estado local ya que no existe en el servidor
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // Maneja cambios en el input de nueva nota
  const handleNoteChange = (event) => {
    console.log(event.target.value)                  // Log para debuggear (opcional)
    setNewNote(event.target.value)                   // Actualiza el estado con el valor del input
  }

  // Filtra qué notas mostrar según el estado showAll
  const notesToShow = showAll
    ? notes                                          // Si showAll es true, muestra todas las notas
    : notes.filter(note => note.important)          // Si es false, solo muestra las importantes

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
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      {/* Formulario para agregar nueva nota */}
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange}
          placeholder="Escribe una nueva nota..."
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 