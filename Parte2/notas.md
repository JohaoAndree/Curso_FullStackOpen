# Parte 2 - React: Manejo de Estado y Filtrado

## Métodos de Array Importantes

### 1. `.filter()`
Crea un nuevo array con todos los elementos que pasen una condición específica.

```javascript
const numeros = [1, 2, 3, 4, 5, 6];
const numerosPares = numeros.filter(numero => numero % 2 === 0);
console.log(numerosPares); // [2, 4, 6]

// En React - Filtrar personas por nombre
const personas = [
  {id: 1, name: "Juan", age: 25},
  {id: 2, name: "María", age: 30}
];
const personasJuan = personas.filter(person => person.name.includes("Juan"));
```

**Uso común en React:** Filtrar listas dinámicamente basado en input del usuario.

### 2. `.find()`
Retorna el **primer elemento** que cumple con la condición, o `undefined` si no encuentra nada.

```javascript
const usuarios = [
  {id: 1, name: "Ana"},
  {id: 2, name: "Luis"},
  {id: 3, name: "Ana"}
];
const primerAna = usuarios.find(user => user.name === "Ana");
console.log(primerAna); // {id: 1, name: "Ana"}
```

**Diferencia con `.filter()`:** 
- `find()` → Retorna **un elemento** (el primero que encuentra)
- `filter()` → Retorna **un array** con todos los elementos que coinciden

### 3. `.includes()`
Verifica si un valor específico existe en un array. Retorna `true` o `false`.

```javascript
const frutas = ["manzana", "banana", "naranja"];
console.log(frutas.includes("banana")); // true
console.log(frutas.includes("uva")); // false

// Para validaciones en React
const nombres = persons.map(person => person.name);
if (nombres.includes(newName)) {
  alert("El nombre ya existe");
}
```

### 4. `.map()` (Repaso)
Transforma cada elemento del array y retorna un nuevo array.

```javascript
// Transformar array de objetos en componentes JSX
const personas = [{id: 1, name: "Juan"}, {id: 2, name: "María"}];
const componentesJSX = personas.map(person => (
  <Person key={person.id} person={person} />
));
```

## Estado en React con useState

### Hook useState
Permite agregar estado a componentes funcionales.

```javascript
import { useState } from 'react';

const App = () => {
  // [variable, función_que_modifica] = useState(valor_inicial)
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [searchItem, setSearchItem] = useState('');
  
  // Función para agregar persona
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      id: persons.length + 1
    };
    setPersons(persons.concat(personObject)); // Inmutabilidad
    setNewName(''); // Limpiar input
  };
};
```

**Principios importantes:**
- **Inmutabilidad:** Nunca modifiques el estado directamente, crea una nueva copia
- **Funciones setter:** Usa `setVariable` para actualizar el estado
- **Re-renderizado:** React re-renderiza cuando el estado cambia

## Manejo de Formularios

### Componentes Controlados
Los inputs controlados por React donde el valor viene del estado.

```javascript
const FormData = ({ onSubmit, name, onNameChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <input 
        value={name}           // ← Controlado por estado
        onChange={onNameChange} // ← Actualiza estado
      />
      <button type="submit">Agregar</button>
    </form>
  );
};
```

### Event Handlers
Funciones que manejan eventos del usuario.

```javascript
const handleNameChange = (event) => {
  console.log(event.target.value); // Valor actual del input
  setNewName(event.target.value);  // Actualizar estado
};

const handleSubmit = (event) => {
  event.preventDefault(); // Prevenir recarga de página
  // Lógica para procesar formulario
};
```

## Filtrado Dinámico

### Implementación de Búsqueda en Tiempo Real
```javascript
const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  
  // Función de filtrado
  const filterPersons = () => {
    if (searchItem === '') {
      return persons; // Mostrar todos si no hay búsqueda
    }
    return persons.filter(person =>
      person.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      person.number.includes(searchItem)
    );
  };
  
  // En el render
  const filteredPersons = filterPersons();
  
  return (
    <div>
      <input 
        value={searchItem} 
        onChange={(e) => setSearchItem(e.target.value)} 
      />
      <ul>
        {filteredPersons.map(person => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};
```

## Buenas Prácticas de React

### 1. Convenciones de Naming
```javascript
// ✅ Correcto - Props en inglés con convenciones claras
<FilterBox searchValue={searchItem} onSearchChange={handleSearch} />
<FormData onSubmit={addData} name={newName} onNameChange={handleNameChange} />

// ❌ Incorrecto - Mezcla idiomas y no sigue convenciones
<FilterBox item={searchItem} controladorItem={handleSearch} />
```

### 2. Componentes y Props
- **Componentes:** Siempre PascalCase (`PersonsList`, no `personsList`)
- **Props de eventos:** Usar `on + Acción` (`onSubmit`, `onChange`)
- **Props de valores:** Descriptivos (`searchValue`, no `item`)

### 3. Estructura de Componentes
```javascript
// ❌ Malo - Componente dentro de componente
const App = () => {
  const PersonsList = () => { /* ... */ }; // Se re-crea en cada render
  return <PersonsList />;
};

// ✅ Bueno - Componente en archivo separado
// components/PersonsList.jsx
const PersonsList = ({ persons, searchItem }) => { /* ... */ };
export default PersonsList;
```

### 4. Keys en Listas
```javascript
// ✅ Correcto - Key única usando ID
{persons.map(person => (
  <Person key={person.id} person={person} />
))}

// ❌ Incorrecto - Key duplicada o no única
{persons.map(person => (
  <Person key={1} person={person} /> // ← Key duplicada
))}
```

## Validaciones Comunes

### Validación de Duplicados
```javascript
// Verificar si nombre ya existe antes de agregar
if (persons.map(person => person.name).includes(newName)) {
  alert(`${newName} ya existe en la agenda`);
  return;
}
```

### Diferencia entre Validaciones
```javascript
// ❌ Validar en onChange - Molesto para el usuario
const handleNameChange = (event) => {
  if (existeNombre(event.target.value)) {
    alert("Ya existe"); // Se ejecuta mientras escribes
  }
  setNewName(event.target.value);
};

// ✅ Validar en onSubmit - Mejor experiencia
const handleSubmit = (event) => {
  event.preventDefault();
  if (existeNombre(newName)) {
    alert("Ya existe"); // Solo al intentar enviar
    return;
  }
  // Procesar formulario
};
```

## Notas Importantes

- **Inmutabilidad:** Usa `.concat()` en lugar de `.push()` para agregar elementos al estado
- **Event handling:** Siempre usa `event.preventDefault()` en formularios para evitar recarga
- **Performance:** Los componentes definidos dentro de otros se re-crean en cada render
- **Debugging:** Los `console.log()` en handlers ayudan a entender el flujo de datos
- **Keys:** React necesita keys únicas para optimizar el renderizado de listas
- **Separación de responsabilidades:** La lógica de estado debe estar en el componente que maneja ese estado

## Pasos para crear un JSON server
1. Crear un archivo `db.json` con el siguiente contenido:
```json
{
  "notas": [
    {
      "id": 1,
      "titulo": "Nota 1",
      "contenido": "Contenido de la nota 1"
    },
    {
      "id": 2,
      "titulo": "Nota 2",
      "contenido": "Contenido de la nota 2"
    }
  ]
}
```

2. Instalar JSON Server:
```bash
npm install -g json-server
```

3. Iniciar el servidor JSON con puerto alternativo 3001:
```bash
json-server --port 3001 --watch db.json
```

4. Bindear script en `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "server": "json-server --port 3001 --watch db.json"
  }
}
```

## Comunicación entre el navegador y el servidor
1. Instalar Axios:
```bash
npm install axios
```
2. Instalar JSON Server como dependencia de desarrollo:
```bash
npm install json-server --save-dev
```
Nota: solo se necesita en entornos de desarrollo.

---

# 📚 Sesión de Trabajo - Servicios y Manejo de Errores

## Módulos de Servicios - Separación de Responsabilidades

### ¿Por qué crear servicios separados?
Los servicios separan la **lógica de comunicación HTTP** de la **lógica de componentes**.

```javascript
// ❌ Malo - HTTP mezclado con componente
const App = () => {
  const [notes, setNotes] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:3001/notes')
      .then(response => setNotes(response.data))
  }, [])
  
  const addNote = (note) => {
    axios.post('http://localhost:3001/notes', note)
      .then(response => setNotes(notes.concat(response.data)))
  }
}

// ✅ Bueno - Servicio separado
// services/noteService.js
import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }
```

### Patrón CRUD Completo
```javascript
// En App.jsx - Uso del servicio
import noteService from './services/noteService'

const App = () => {
  const [notes, setNotes] = useState([])
  
  // CREATE
  const addNote = (note) => {
    noteService
      .create(note)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }
  
  // READ
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  // UPDATE
  const updateNote = (id, changedNote) => {
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
  }
  
  // DELETE
  const deleteNote = (id) => {
    noteService
      .remove(id)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id))
      })
  }
}
```

## ⚠️ IDs Automáticos vs Manuales

### ❌ Problema con IDs manuales:
```javascript
// MALO - No hagas esto
const noteObject = {
  content: newNote,
  id: notes.length + 1,  // ← Puede causar conflictos
}
```

### ✅ Solución - Deja que el servidor maneje IDs:
```javascript
// BUENO - Así es mejor
const noteObject = {
  content: newNote,
  important: Math.random() < 0.5,
  // No incluir id - JSON Server lo genera automáticamente
}
```

**¿Por qué es importante?**
- **Evita conflictos** entre múltiples usuarios
- **Más robusto** - no depende del estado local
- **Estándar de la industria** - las bases de datos manejan sus propios IDs

## 🔄 Manejo de Estados Asíncronos

### Actualización Optimista vs Pesimista

```javascript
// ✅ Patrón Pesimista (Recomendado para principiantes)
const addNote = (event) => {
  event.preventDefault()
  
  noteService
    .create(noteObject)           // 1. Enviar al servidor
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))  // 2. Actualizar estado SI funciona
      setNewNote('')              // 3. Limpiar form SI funciona
    })
    .catch(error => {
      console.error('Error:', error)        // 4. Manejar error
    })
}

// ⚡ Patrón Optimista (Avanzado)
const addNoteOptimistic = (event) => {
  event.preventDefault()
  
  setNotes(notes.concat(noteObject))  // 1. Actualizar estado ANTES
  setNewNote('')                      // 2. Limpiar form ANTES
  
  noteService
    .create(noteObject)
    .catch(error => {
      // 3. Si falla, revertir cambios
      setNotes(notes)
      setNewNote(noteObject.content)
      alert('Error al guardar')
    })
}
```

## 🚨 Manejo Robusto de Errores

### Problema de Naming Conflicts
```javascript
// ❌ PROBLEMA - Conflicto con window.alert()
const [alert, setAlert] = useState(null)  // ← Estado llamado 'alert'

// Más tarde...
.catch(error => {
  alert(`Error: ${error.message}`)  // ← Intenta llamar window.alert() pero 'alert' es tu estado!
})
```

### ✅ Solución - Nombres únicos:
```javascript
const [notification, setNotification] = useState(null)

// Función helper para notificaciones
const showNotification = (message, type = 'success') => {
  setNotification({ message, type })
  setTimeout(() => {
    setNotification(null)
  }, type === 'error' ? 5000 : 3000)
}

// Uso correcto
.then(() => {
  showNotification('Nota creada correctamente')  // Verde, 3 segundos
})
.catch(error => {
  showNotification(`Error: ${error.message}`, 'error')  // Rojo, 5 segundos
})
```

## 🎨 Sistema de Notificaciones Dinámicas

### Componente con Template Literals
```javascript
// components/Notification.jsx
const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const { message, type } = notification
  
  return (
    <div className={`notification ${type === 'error' ? 'notification-error' : 'notification-success'}`}>
      {message}
    </div>
  )
}
```

### CSS con Patrón BEM
```css
/* Clase base - estilos comunes */
.notification {
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  border-width: 2px;
}

/* Modificador para éxito */
.notification-success {
  color: #155724;
  background: #d4edda;
  border-color: #c3e6cb;
}

/* Modificador para error */
.notification-error {
  color: #721c24;
  background: #f8d7da;
  border-color: #f5c6cb;
}
```

**Explicación del className dinámico:**
```javascript
className={`notification ${type === 'error' ? 'notification-error' : 'notification-success'}`}
//          ^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//          Clase base    Operador ternario para clase condicional
//
// Resultado:
// - Para éxito: "notification notification-success"
// - Para error: "notification notification-error"
```

## 🔄 Validación y Actualización de Datos

### Patrón Update vs Create
```javascript
const addData = (event) => {
  event.preventDefault()
  
  // Verificar si ya existe
  if (persons.map(person => person.name).includes(newName)) {
    if (window.confirm(`${newName} ya existe. ¿Actualizar número?`)) {
      // ACTUALIZAR persona existente
      const personToUpdate = persons.find(person => person.name === newName)
      const updatedPerson = { ...personToUpdate, number: newNumber }
      
      personService
        .update(updatedPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => 
            person.id !== returnedPerson.id ? person : returnedPerson
          ))
          setNewName('')
          setNewNumber('')
        })
    }
    return  // ← IMPORTANTE: Salir sin crear nueva persona
  }
  
  // CREAR nueva persona
  const personObject = { name: newName, number: newNumber }
  personService.create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
}
```

## 🎯 Gestión de Props en Componentes Anidados

### Flujo de Datos y Funciones
```javascript
// App.jsx - Donde vive el estado
const App = () => {
  const [persons, setPersons] = useState([])
  
  const deleteData = (id) => {
    // Lógica de eliminación
  }
  
  return (
    <PersonsList 
      persons={persons} 
      onDelete={deleteData}  // ← Pasar función hacia abajo
    />
  )
}

// PersonsList.jsx - Componente intermedio
const PersonsList = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map(person =>
        <Person 
          key={person.id} 
          person={person} 
          onDelete={onDelete}  // ← Pasar función más abajo
        />
      )}
    </ul>
  )
}

// Person.jsx - Componente final
const Person = ({ person, onDelete }) => {
  return (
    <li>
      {person.name} - {person.number}
      <button onClick={() => onDelete(person.id)}>  {/* ← Usar función */}
        Eliminar
      </button>
    </li>
  )
}
```

**Regla de oro:** El estado vive donde se necesita y las funciones se pasan hacia abajo.

## 🎨 CSS Reset y Diseño de Página Completa

### Problema del fondo de página
```css
/* ❌ PROBLEMA - Solo colorea el div de la app */
.app-container {
  background-color: rgb(39, 39, 39);
  /* No cubre toda la página debido a márgenes por defecto */
}
```

### ✅ Solución - Reset CSS completo:
```css
/* Reset básico para eliminar márgenes y padding por defecto */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Asegurar que html, body y root ocupen toda la altura */
html, body, #root {
  height: 100%;
}

/* Restaurar padding de listas para mantener indentación */
ul {
  padding-left: 40px;  /* Los puntos vuelven a verse correctamente */
}

.app-container {
  min-height: 100vh;                    /* Altura completa del viewport */
  background-color: rgb(39, 39, 39);
  color: rgb(231, 221, 221);
  padding: 20px;                        /* Espaciado interno */
}
```

## 📋 Puntos Clave para Recordar

### 1. **Separación de Responsabilidades**
- Servicios para HTTP, componentes para UI
- Una función por responsabilidad
- Módulos separados para diferentes funcionalidades

### 2. **Manejo de Errores Robusto**
- Siempre usar `.catch()` en operaciones asíncronas
- Mostrar errores en la UI, no solo en consola
- Evitar conflictos de nombres (alert vs window.alert)

### 3. **Estado Inmutable**
- Nunca modificar estado directamente
- Usar `.concat()`, `.map()`, `.filter()` para nuevos arrays
- Spread operator para objetos: `{ ...obj, newProp: value }`

### 4. **Validaciones en el lugar correcto**
- Validar en `onSubmit`, no en `onChange`
- Confirmar acciones destructivas con `window.confirm()`
- Manejar casos edge (datos eliminados por otros usuarios)

### 5. **Performance y Buenas Prácticas**
- Keys únicas en listas
- Componentes en archivos separados
- Props con nombres descriptivos
- Event handlers con nombres claros

### 6. **CSS Moderno**
- Reset CSS para consistencia
- Patrón BEM para nomenclatura
- Template literals para clases dinámicas
- Variables CSS para mantener colores consistentes

### 7. **Debugging Efectivo**
- Console.log estratégicos en handlers
- Verificar tipos de datos recibidos
- Comprobar que las funciones lleguen a los componentes correctos
