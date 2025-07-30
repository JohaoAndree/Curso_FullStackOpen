# Parte 2 - React: Estado, HTTP y APIs Externas

## 🔧 Métodos de Array Esenciales

### `.filter()`
Crea un array con elementos que pasen una condición.
```javascript
const countries = [{name: {common: "Finland"}}, {name: {common: "Spain"}}];
const filtered = countries.filter(country => 
  country.name.common.toLowerCase().includes("fin")
);
```

### `.find()`
Retorna el **primer elemento** que cumple la condición.
```javascript
const country = countries.find(c => c.name.common === "Finland");
// find() → un objeto | undefined
// filter() → siempre un array
```

### `.includes()`
Verifica existencia de un valor.
```javascript
const names = persons.map(p => p.name);
if (names.includes(newName)) {
  alert("Ya existe");
}
```

## 🎯 Estado con useState

### Hook useState
```javascript
import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  
  // ✅ Inmutabilidad - NUNCA modificar estado directamente
  setPersons(persons.concat(newPerson));     // ✅ Correcto
  setPersons([...persons, newPerson]);       // ✅ Correcto
  persons.push(newPerson);                   // ❌ MALO - Muta estado
};
```

## 🌐 APIs Externas vs JSON Server

### Cuándo usar cada uno:
```javascript
// JSON Server - Para datos locales/simulación
"server": "json-server --port 3001 --watch db.json"

// API Externa - Para datos reales
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
// ❌ NO necesitas json-server para APIs externas
```

### Servicios HTTP
```javascript
// services/countriesService.js
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getByName = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`)
  return request.then(response => response.data)
}

export default { getAll, getByName }
```

## 🔄 useEffect y Datos Asíncronos

### Carga inicial de datos
```javascript
useEffect(() => {
  countriesService
    .getAll()
    .then(data => setCountries(data))
    .catch(error => console.error('Error:', error))
}, []) // Array vacío = solo una vez al montar
```

### useEffect con dependencias
```javascript
const [weather, setWeather] = useState(null)

useEffect(() => {
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    weatherService.getWeather(country.latlng[0], country.latlng[1])
      .then(data => setWeather(data))
  } else {
    setWeather(null)
  }
}, [filteredCountries]) // Se ejecuta cuando filteredCountries cambia
```

**Dependencias importantes:**
- `[]` → Solo al montar
- `[variable]` → Cuando variable cambia
- Sin array → En cada render (¡evitar!)

## 🎨 Renderizado Condicional

### Múltiples condiciones
```javascript
const CountriesList = ({ countries, searchValue }) => {
  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (searchValue === '') {
    return <p>No se ha ingresado ningún país</p>
  } else if (filtered.length > 10) {
    return <p>Demasiados países, refine su búsqueda</p>
  } else if (filtered.length > 1) {
    return <CountryList countries={filtered} />
  } else if (filtered.length === 1) {
    return <CountryDetails country={filtered[0]} />
  } else {
    return <p>No se encontraron países</p>
  }
}
```

## 🔧 Manejo de Funciones y Props

### Diferentes tipos de handlers
```javascript
const App = () => {
  // Para inputs (recibe event)
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }
  
  // Para botones (recibe valor directo)
  const handleShowCountry = (countryName) => {
    setSearchValue(countryName)
  }
  
  return (
    <div>
      <input onChange={handleSearchChange} />
      <CountriesList onShow={handleShowCountry} />
    </div>
  )
}
```

**❌ Error común:**
```javascript
// Botón llama onShow(countryName) → string
// Pero handler espera event.target.value
onClick={() => onShow(country.name.common)} // Pasa string
// En App.jsx:
const handler = (event) => event.target.value // ❌ Error!
```

## 📊 Estructura de Datos de APIs

### API Countries - Estructura real
```javascript
// ❌ Lo que podrías pensar:
country.name = "Finland" // string

// ✅ Estructura real:
country.name = {
  common: "Finland",
  official: "Republic of Finland",
  nativeName: {...}
}

// Por eso usar:
country.name.common.toLowerCase() // ✅ Correcto
```

### APIs de Clima Gratuitas
- **OpenMeteo** (Recomendado): Sin API key, ilimitado
- **OpenWeatherMap**: 1,000 llamadas/día
- **WeatherAPI**: 1,000,000 llamadas/mes

```javascript
// OpenMeteo - Sin registro
const getWeather = (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  return axios.get(url).then(response => response.data)
}
```

## 🎯 Patrones de Comunicación

### Props Drilling
```javascript
// Estado vive en App
App → CountriesList → Country
    ↓ props         ↓ props
  {onShow}        {onShow}

// Evento fluye hacia arriba
Country → CountriesList → App
   ↑ onShow()        ↑ onShow()
```

### Convenciones de Props
```javascript
// ✅ Buenas convenciones
<FilterBox 
  searchValue={searchValue}           // Valor actual
  onSearchChange={handleSearch}       // Handler para eventos
/>
<CountriesList 
  countries={countries}               // Datos
  onShow={handleShowCountry}          // Handler para acciones
/>
```

## 🚨 Errores Comunes y Soluciones

### 1. Async/Sync Confusion
```javascript
// ❌ MALO - Tratar promesa como valor síncrono
const getWeather = (country) => {
  countriesService.getWeather(...)
    .then(data => return data) // ← Este return no funciona
}
// En JSX: {getWeather(country).temperature} // ← undefined

// ✅ CORRECTO - Usar estado para datos asíncronos
const [weather, setWeather] = useState(null)
useEffect(() => {
  weatherService.getWeather(...)
    .then(data => setWeather(data))
}, [dependency])
```

### 2. Conflictos de nombres
```javascript
// ❌ PROBLEMA
const [alert, setAlert] = useState(null) // ← Estado llamado 'alert'
// Luego...
alert("Error occurred") // ← Intenta usar window.alert pero 'alert' es tu estado

// ✅ SOLUCIÓN
const [notification, setNotification] = useState(null)
window.alert("Error occurred") // O crear función helper
```

### 3. StrictMode y doble ejecución
```javascript
// En desarrollo con StrictMode:
console.log("Ejecutado") // Aparece 2 veces
// ✅ Es normal - En producción solo una vez
```

## 🛠️ Configuración de Desarrollo

### Vite vs Create React App
```javascript
// Vite (moderno) - Incluye StrictMode por defecto
<StrictMode>
  <App />
</StrictMode>

// StrictMode detecta:
// - Efectos secundarios en renders
// - Componentes que se re-crean
// - Prepara para React 18+
```

### Scripts útiles
```json
{
  "scripts": {
    "dev": "vite",                    // Solo frontend
    "server": "json-server --port 3001 --watch db.json" // Solo para APIs locales
  }
}
```

## 🎨 CSS y Styling

### Tema oscuro moderno
```css
/* Reset base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  color: #e0e0e0;
  font-family: 'Segoe UI', sans-serif;
}

/* Glassmorphism */
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.2);
}
```

## 🎯 Mejores Prácticas

### 1. Estructura de componentes
```javascript
// ✅ Un componente por archivo
// components/CountriesList.jsx
// components/Country.jsx
// services/countriesService.js
```

### 2. Naming conventions
```javascript
// ✅ Componentes: PascalCase
const CountriesList = () => {}

// ✅ Funciones: camelCase con verbo
const handleSearchChange = () => {}
const getWeatherData = () => {}

// ✅ Props: descriptivas
<Component searchValue={value} onSearchChange={handler} />
```

### 3. Keys en listas
```javascript
// ✅ Key única e inmutable
{countries.map(country => (
  <Country key={country.name.common} country={country} />
))}

// ❌ Key que puede cambiar
{countries.map((country, index) => (
  <Country key={index} country={country} /> // ← Puede causar bugs
))}
```

### 4. Validaciones
```javascript
// ✅ Validar en onSubmit, no onChange
const handleSubmit = (event) => {
  event.preventDefault()
  
  if (existeNombre(newName)) {
    alert("Ya existe")
    return
  }
  
  // Proceder con lógica
}
```

## 📋 Checklist Final

**Antes de hacer commit:**
- [ ] ¿Servicios HTTP en archivos separados?
- [ ] ¿useEffect con dependencias correctas?
- [ ] ¿Manejo de errores en promesas?
- [ ] ¿Keys únicas en todas las listas?
- [ ] ¿Props con nombres descriptivos?
- [ ] ¿Validaciones en lugar correcto?
- [ ] ¿Estado inmutable (no mutación directa)?
- [ ] ¿CSS responsive y con buen contraste?

**Comandos importantes:**
```bash
npm run dev          # Desarrollo frontend (puerto 5173)
npm run server       # JSON Server local (puerto 3001)
npm install axios    # HTTP cliente
```

**APIs recomendadas:**
- **Países**: https://studies.cs.helsinki.fi/restcountries/
- **Clima**: https://open-meteo.com/ (gratis, sin API key)
- **Otros**: JSONPlaceholder, Rick & Morty API, PokéAPI
