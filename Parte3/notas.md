# Parte 3: Backend con Node.js y Express

## Iniciar un servidor simple

1. Primero, creamos una carpeta donde se almacenará el proyecto y nos movemos a ella:
  ```bash
  mkdir part3
  cd part3
  ```

2. Luego, inicializamos un nuevo proyecto de Node.js:
  ```bash
  npm init
  ```

3. Instalamos Express y Nodemon como dependencias de desarrollo:
  ```bash
  npm install express
  npm install --save-dev nodemon
  ```
  
4. Creamos un archivo `index.js` en la carpeta `part3`:
  
  **En PowerShell (Windows):**
  ```powershell
  New-Item -ItemType File -Name "index.js"
  ```
  
  **O simplemente:**
  ```powershell
  ni index.js
  ```
  
  **En Bash/Terminal (Linux/macOS):**
  ```bash
  touch index.js
  ```

5. Agregamos el siguiente código a `index.js` para crear un servidor simple:
  ```javascript
  const express = require('express')
  const app = express()

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  const PORT = 3001

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  ```

6. Actualizamos el archivo `package.json` para agregar un script de inicio:
  ```json
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
  ```

7. Creamos un archivo `.gitignore` para evitar subir archivos innecesarios al repositorio:
  **En PowerShell (Windows):**
  ```powershell
  New-Item -ItemType File -Name ".gitignore"
  ```

  **O en PowerShell:**
  ```powershell
  ni .gitignore
  ```

8. Agregamos las siguiente líneas a nuestro archivo `.gitignore`:
  ```
  node_modules
  .env
  ```

9. Ahora podemos iniciar el servidor en modo desarrollo:
  ```bash
  npm run dev
  ```

## Middlewares esenciales

### 1. Express JSON Parser
```javascript
app.use(express.json())
```
**IMPORTANTE:** Sin esto, `request.body` será `undefined` en solicitudes POST.

### 2. Morgan (Logging)
```bash
npm install morgan
```

**Configuración básica:**
```javascript
const morgan = require('morgan')
app.use(morgan('tiny'))
```

**Configuración para mostrar body en POST:**
```javascript
// Token personalizado para body
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

// Usar morgan tiny + body para POST
app.use(morgan('tiny'))
app.use(morgan(':body', {
  skip: (req) => req.method !== 'POST'
}))
```

## Rutas REST típicas

### GET - Obtener todos los recursos
```javascript
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
```

### GET - Obtener un recurso específico
```javascript
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
```

### POST - Crear nuevo recurso
```javascript
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Validaciones
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Falta nombre o número'
    })
  }

  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'El nombre ya existe'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
})
```

### DELETE - Eliminar recurso
```javascript
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  
  response.status(204).end()
})
```

## Generación de IDs

### ID aleatorio (como pide el ejercicio)
```javascript
const generateId = () => {
  return Math.floor(Math.random() * 1000000)
}
```

### ID incremental (más seguro)
```javascript
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}
```

## Códigos de estado HTTP importantes

- `200` - OK (GET exitoso)
- `201` - Created (POST exitoso)
- `204` - No Content (DELETE exitoso)
- `400` - Bad Request (datos faltantes/inválidos)
- `404` - Not Found (recurso no encontrado)

## Validaciones importantes

### Validaciones separadas (mejor práctica)
```javascript
// ✅ Correcto - validaciones independientes
if (!body.name || !body.number) {
  return response.status(400).json({ error: 'Datos faltantes' })
}

if (persons.find(p => p.name === body.name)) {
  return response.status(400).json({ error: 'Nombre duplicado' })
}
```

### Evitar else if en validaciones
```javascript
// ❌ Evitar esto
if (!body.name) {
  return response.status(400).json({ error: 'Falta nombre' })
} else if (persons.find(p => p.name === body.name)) {
  return response.status(400).json({ error: 'Nombre duplicado' })
}
```

## Datos en memoria vs persistencia

**IMPORTANTE:** Los datos se pierden al reiniciar el servidor porque están en memoria (variable `let persons = []`).

Para persistencia real necesitarías:
- Base de datos (MongoDB, PostgreSQL, etc.)
- Archivos JSON
- Local Storage (solo frontend)

## Consejos de debugging

1. **Morgan te muestra:**
   - Método HTTP
   - URL
   - Código de estado
   - Tamaño de respuesta (bytes)
   - Tiempo de respuesta
   - Body (si configuras token personalizado)

2. **Errores comunes:**
   - Olvidar `app.use(express.json())` → `request.body` undefined
   - Usar `else if` en validaciones → confusión lógica
   - No validar datos antes de usarlos → errores de servidor

3. **Testing con Postman:**
   - Usar método correcto (GET, POST, DELETE)
   - En POST: Body → raw → JSON
   - Verificar headers `Content-Type: application/json`