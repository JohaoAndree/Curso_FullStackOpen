const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

// Configurar token personalizado para mostrar el body de las solicitudes POST
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

// Usar morgan tiny para todas las solicitudes
app.use(morgan('tiny'))

// Usar morgan personalizado solo para solicitudes POST (adicional)
app.use(morgan(':body', {
  skip: (req) => req.method !== 'POST'
}))

let contacts = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hola mundo!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(contacts)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const contact = contacts.find(contact => contact.id === id)

  if (contact) {
    response.json(contact)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  const date = new Date()
  const info = `<p>La agenda telefónica tiene información de ${contacts.length} personas</p>
                <p>${date}</p>`

  response.send(info)
})

const generateId = () => {
  const id = Math.floor(Math.random() * 1000000)

  return id
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Falta nombre o número'
    })
  } 

  if (contacts.find(contact => contact.name === body.name)) {
    return response.status(400).json({
      error: 'El nombre ya existe en la agenda, debe ser único'
    })
  }

  const contact = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  contacts = contacts.concat(contact)
  response.json(contact)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Servidor iniciado en la ruta http://localhost:${PORT}`)
})