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
